import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-header", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.from(".contact-form", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
      });
      gsap.from(".contact-info", {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.4,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="contact-header text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about JapanConnect? We're here to help you stay connected.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="contact-form bg-white rounded-2xl p-8 shadow-sm border">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    maxLength={1000}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="contact-info bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Email Support</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Response within 24 hours
                    </p>
                    <a 
                      href="mailto:support@japanconnect.com"
                      className="text-primary hover:underline font-medium text-sm"
                    >
                      support@japanconnect.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-info bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Phone Support</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Available 9 AM - 6 PM JST
                    </p>
                    <a 
                      href="tel:+81312345678"
                      className="text-primary hover:underline font-medium text-sm"
                    >
                      +81-3-1234-5678
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-info bg-primary/5 border border-primary/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Quick Help</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Find instant answers to common questions
                    </p>
                    <a 
                      href="/#faq"
                      className="text-primary hover:underline font-medium text-sm inline-flex items-center gap-1"
                    >
                      View FAQ →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
