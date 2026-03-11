import React, { useState, useEffect } from 'react';
import { Menu, X, Code, MonitorSmartphone, Cloud, Database, Cpu, ChevronRight, Mail, Phone, MapPin, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {imgError ? (
              <span className={`text-2xl font-bold tracking-tighter ${isScrolled ? 'text-indigo-600' : 'text-white'}`}>
                Sajilo<span className={isScrolled ? 'text-gray-900' : 'text-indigo-200'}>ProjectHub</span>
              </span>
            ) : (
              <img 
                src="/logo.png" 
                alt="Sajilo Project Hub" 
                className="h-10 w-auto object-contain" 
                onError={() => setImgError(true)} 
              />
            )}
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-gray-200 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${isScrolled ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-indigo-600 hover:bg-gray-100'}`}>
              Get a Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isScrolled ? 'text-gray-900' : 'text-white'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <a href="#contact" className="block w-full text-center px-5 py-3 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[100px]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-semibold tracking-wider mb-6 border border-indigo-500/20">
            EMPOWERING YOUR DIGITAL VISION
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
            Transforming Ideas into <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Digital Reality
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Sajilo Project Hub is your trusted IT partner. We deliver cutting-edge software solutions, web development, and digital transformation services to help businesses thrive in the modern era.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#services" className="px-8 py-4 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              Explore Our Services <ChevronRight size={18} />
            </a>
            <a href="#contact" className="px-8 py-4 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 backdrop-blur-sm transition-colors border border-white/10">
              Let's Talk
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Code size={32} className="text-indigo-600" />,
      title: "Web Development",
      description: "Custom, responsive, and high-performance websites and web applications tailored to your business needs."
    },
    {
      icon: <MonitorSmartphone size={32} className="text-indigo-600" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that provide seamless user experiences on iOS and Android."
    },
    {
      icon: <Cloud size={32} className="text-indigo-600" />,
      title: "Cloud Solutions",
      description: "Scalable and secure cloud infrastructure setup, migration, and management services."
    },
    {
      icon: <Database size={32} className="text-indigo-600" />,
      title: "Data Engineering",
      description: "Robust data pipelines, warehousing, and analytics solutions to unlock the value of your data."
    },
    {
      icon: <Cpu size={32} className="text-indigo-600" />,
      title: "AI & Machine Learning",
      description: "Intelligent solutions that automate processes and provide predictive insights for your business."
    },
    {
      icon: <Code size={32} className="text-indigo-600" />,
      title: "UI/UX Design",
      description: "User-centric design services that ensure your digital products are intuitive, engaging, and beautiful."
    },
    {
      icon: <TrendingUp size={32} className="text-indigo-600" />,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies to increase your online visibility, drive traffic, and boost conversions."
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-2">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive IT Services</h3>
          <p className="text-lg text-gray-600">
            We offer a full spectrum of technology services to help you build, scale, and optimize your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-2">About Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Building the Future of Technology, Together.
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Sajilo Project Hub, we believe that technology should be an enabler, not a hurdle. Founded with the vision to simplify complex IT challenges, we bring together a team of passionate developers, designers, and strategists.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our approach is rooted in collaboration, transparency, and a relentless pursuit of excellence. Whether you're a startup looking to launch an MVP or an enterprise seeking digital transformation, we have the expertise to deliver results that matter.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-4 border-indigo-600 pl-4">
                <p className="text-3xl font-bold text-gray-900">50+</p>
                <p className="text-sm text-gray-500 font-medium mt-1">Projects Delivered</p>
              </div>
              <div className="border-l-4 border-indigo-600 pl-4">
                <p className="text-3xl font-bold text-gray-900">99%</p>
                <p className="text-sm text-gray-500 font-medium mt-1">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Team working together" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Trusted by</p>
                  <p className="text-lg font-bold text-gray-900">Top Companies</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-2">Get In Touch</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your next project?</h3>
            <p className="text-gray-400 text-lg mb-10">
              Reach out to us today to discuss how Sajilo Project Hub can help bring your ideas to life. We're here to answer your questions and provide the best IT solutions.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="text-indigo-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Email Us</p>
                  <p className="text-lg font-medium">sajiloprojecthub@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="text-indigo-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Call Us</p>
                  <p className="text-lg font-medium">+977-9708547685</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="text-indigo-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Visit Us</p>
                  <p className="text-lg font-medium">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h4>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" id="firstName" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-gray-900" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" id="lastName" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-gray-900" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-gray-900" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Interested Service</label>
                <select id="service" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-gray-900 bg-white">
                  <option>Web Development</option>
                  <option>Mobile App Development</option>
                  <option>Cloud Solutions</option>
                  <option>UI/UX Design</option>
                  <option>Digital Marketing</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-gray-900 resize-none" placeholder="Tell us about your project..."></textarea>
              </div>
              <button type="button" className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <footer className="bg-slate-950 text-gray-400 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            {imgError ? (
              <span className="text-2xl font-bold tracking-tighter text-white mb-4 block">
                Sajilo<span className="text-indigo-400">ProjectHub</span>
              </span>
            ) : (
              <img 
                src="/logo.png" 
                alt="Sajilo Project Hub" 
                className="h-12 w-auto object-contain mb-4" 
                onError={() => setImgError(true)} 
              />
            )}
            <p className="max-w-md mb-6">
              Empowering businesses with innovative IT solutions. We build scalable, secure, and user-centric digital products.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Sajilo Project Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
