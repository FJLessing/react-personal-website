import { useRef, useEffect } from "react";

type Cell = 0 | 1;
type Grid = Cell[][];

const GameOfLife = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Detect mobile (screen width < 768px or touch device)
  const isMobile: boolean =
    window.innerWidth < 768 ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

  // Settings - optimized for mobile vs desktop
  const RESOLUTION: number = isMobile
    ? Math.max(window.innerWidth, window.innerHeight) / 48
    : Math.max(window.innerWidth, window.innerHeight) / 144;
  const SPEED: number = isMobile ? 16 : 12;
  const REPULSION_RADIUS: number = isMobile ? 4 : 8;
  const PUSH_DISTANCE: number = isMobile ? 1 : 2;
  const SPAWN_INTERVAL: number = isMobile ? 4 : 2;
  const INITIAL_DENSITY: number = isMobile ? 0.9 : 0.85;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Setup Canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate grid dimensions
    const cols: number = Math.floor(canvas.width / RESOLUTION);
    const rows: number = Math.floor(canvas.height / RESOLUTION);

    const reseed = (): Grid =>
      new Array(cols)
        .fill(null)
        .map(() =>
          new Array(rows)
            .fill(null)
            .map(() => (Math.random() > INITIAL_DENSITY ? 1 : 0) as Cell),
        );

    // 2. Create the Grid (2D Array)
    let grid: Grid = reseed();

    // Mouse tracking
    let mouseCol: number = -1;
    let mouseRow: number = -1;

    const handleMouseMove = (e: MouseEvent): void => {
      // Use clientX/Y directly since canvas is positioned fixed at 0,0
      mouseCol = Math.floor(e.clientX / RESOLUTION);
      mouseRow = Math.floor(e.clientY / RESOLUTION);
    };

    const handleMouseLeave = (): void => {
      mouseCol = -1;
      mouseRow = -1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let animationId: number;
    let frameCount: number = 0;
    let generationCounter: number = 0;

    // Reset heuristics
    const MIN_ALIVE: number = Math.max(8, Math.floor(cols * rows * 0.002)); // ~0.2% or at least 8 cells
    const BORING_FRAMES_BEFORE_RESET: number = 120; // generations (not RAF frames)
    let lowAliveStreak: number = 0;
    let noChangeStreak: number = 0;

    const render = (): void => {
      // Throttle speed (update only every X frames)
      frameCount++;
      if (frameCount < SPEED) {
        animationId = requestAnimationFrame(render);
        return;
      }
      frameCount = 0;

      // 3. Draw the current frame
      ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          if (grid[col][row] === 1) {
            ctx.fillStyle = Math.random() > 0.5 ? "#f0b100" : "#ebc357";
            ctx.beginPath();
            ctx.arc(
              col * RESOLUTION + RESOLUTION / 2,
              row * RESOLUTION + RESOLUTION / 2,
              RESOLUTION / 2,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
        }
      }

      // 4. Apply Mouse Repulsion (push cells away)
      const nextGrid: Grid = grid.map((arr) => [...arr]);

      if (mouseCol >= 0 && mouseRow >= 0) {
        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows; row++) {
            if (grid[col][row] === 1) {
              const distance: number = Math.sqrt(
                Math.pow(col - mouseCol, 2) + Math.pow(row - mouseRow, 2),
              );

              if (distance < REPULSION_RADIUS && distance > 0) {
                // Calculate push
                const dirX: number = (col - mouseCol) / distance;
                const dirY: number = (row - mouseRow) / distance;

                // Calculate new position
                const newCol: number = Math.round(col + dirX * PUSH_DISTANCE);
                const newRow: number = Math.round(row + dirY * PUSH_DISTANCE);

                // Clear old position
                nextGrid[col][row] = 0 as Cell;

                // Set new position if valid
                if (
                  newCol >= 0 &&
                  newCol < cols &&
                  newRow >= 0 &&
                  newRow < rows
                ) {
                  nextGrid[newCol][newRow] = 1 as Cell;
                }
              }
            }
          }
        }
      }

      // 5. Compute Next Generation (Game of Life rules)
      const finalGrid: Grid = nextGrid.map((arr) => [...arr]);

      let aliveCount: number = 0;
      let changedCount: number = 0;

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          // Count neighbors
          let neighbors: number = 0;

          for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
              if (i === 0 && j === 0) continue;

              const x_cell: number = col + i;
              const y_cell: number = row + j;

              if (
                x_cell >= 0 &&
                x_cell < cols &&
                y_cell >= 0 &&
                y_cell < rows
              ) {
                neighbors += nextGrid[x_cell][y_cell];
              }
            }
          }

          const currentCell: Cell = nextGrid[col][row];
          let nextCell: Cell = currentCell;

          // Apply Game of Life Rules
          if (currentCell === 1 && (neighbors < 2 || neighbors > 3)) {
            nextCell = 0 as Cell;
          } else if (currentCell === 0 && neighbors === 3) {
            nextCell = 1 as Cell;
          }

          finalGrid[col][row] = nextCell;

          if (nextCell === 1) aliveCount++;
          if (nextCell !== currentCell) changedCount++;
        }
      }

      // 6. Spawn cells at mouse position (after Game of Life rules so they survive)
      if (mouseCol >= 0 && mouseRow >= 0) {
        generationCounter++;
        if (generationCounter >= SPAWN_INTERVAL) {
          // Spawn a small cluster around mouse position
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const spawnCol: number = mouseCol + dx;
              const spawnRow: number = mouseRow + dy;
              if (
                spawnCol >= 0 &&
                spawnCol < cols &&
                spawnRow >= 0 &&
                spawnRow < rows
              ) {
                finalGrid[spawnCol][spawnRow] = 1 as Cell;
              }
            }
          }
          generationCounter = 0;
        }
      }

      // Boring-state detection
      if (aliveCount < MIN_ALIVE) lowAliveStreak++;
      else lowAliveStreak = 0;

      if (changedCount === 0) noChangeStreak++;
      else noChangeStreak = 0;

      if (
        lowAliveStreak >= BORING_FRAMES_BEFORE_RESET ||
        noChangeStreak >= BORING_FRAMES_BEFORE_RESET
      ) {
        grid = reseed();
        lowAliveStreak = 0;
        noChangeStreak = 0;

        // Clear hard so the new seed is visible immediately
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        animationId = requestAnimationFrame(render);
        return;
      } else if (noChangeStreak > BORING_FRAMES_BEFORE_RESET) {
        // Throw in a disruptor group to keep the effect alive.
        const disruptorCol = Math.floor(Math.random() * cols);
        const disruptorRow = Math.floor(Math.random() * rows);
        const pocketSize = 2;
        for (
          let col = disruptorCol - pocketSize;
          col <= disruptorCol + pocketSize;
          col++
        ) {
          for (
            let row = disruptorRow - pocketSize;
            row <= disruptorRow + pocketSize;
            row++
          ) {
            if (col >= 0 && col < cols && row >= 0 && row < rows) {
              finalGrid[col][row] = 1 as Cell;
            }
          }
        }
      }

      grid = finalGrid;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen -z-10 bg-[#232323]"
    />
  );
};

export default GameOfLife;
