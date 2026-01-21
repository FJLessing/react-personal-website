import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { CONTACT_INFO } from '../constants';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/slack-proxy.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `🎉 New contact form submission from ${formData.name}!`,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*📧 New Contact Form Submission*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Message:* ${formData.message}`
              }
            },
            {
              type: "divider"
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `Sent from ${window.location.href}`
                }
              ]
            }
          ]
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="px-6 py-20">
      <div className="max-w-4xl mx-auto border border-zinc-800 rounded p-12">
        <h2 className="text-3xl md:text-4xl mb-12">
          Get In <span className="text-yellow-500">Touch</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <p className="text-zinc-400">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-zinc-400">
                <div className="w-12 h-12 bg-yellow-500/10 rounded flex items-center justify-center">
                  <Mail className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-white">Email</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-yellow-500 transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-zinc-400">
                <div className="w-12 h-12 bg-yellow-500/10 rounded flex items-center justify-center">
                  <Phone className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-white">Phone</p>
                  <a href={CONTACT_INFO.telLink} className="hover:text-yellow-500 transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-zinc-400">
                <div className="w-12 h-12 bg-yellow-500/10 rounded flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-white">Website</p>
                  <a href={CONTACT_INFO.website} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">
                    www.fjlessing.co.za
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded text-green-400">
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded text-red-400">
                ❌ Oops! Something went wrong. Please try again later.
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-white mb-2">Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded focus:border-yellow-500 focus:outline-none text-white"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded focus:border-yellow-500 focus:outline-none text-white"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-white mb-2">Message</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded focus:border-yellow-500 focus:outline-none text-white resize-none"
                placeholder="Your message"
              />
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white rounded transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}