
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  UserCircle, 
  Upload, 
  Shield, 
  FileCheck, 
  CreditCard,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Simple Account Creation",
    description: "Create an account with email & password. No technical knowledge needed.",
    icon: UserCircle,
    color: "bg-amber-800" // Rich brown (was green)
  },
  {
    id: 2,
    title: "Upload Artwork & Documentation",
    description: "Add high-resolution images and certificates of authenticity.",
    icon: Upload,
    color: "bg-accent/90" // Slightly lighter gold
  },
  {
    id: 3,
    title: "Verified Custodian Check",
    description: "Optional expert validation ensures trust and authenticity.",
    icon: Shield,
    color: "bg-accent" // Rich gold
  },
  {
    id: 4,
    title: "Digital Proof & Ownership",
    description: "Artwork is recorded with immutable proof of ownership & provenance.",
    icon: FileCheck,
    color: "bg-primary/90" // Slightly lighter forest green
  },
  {
    id: 5,
    title: "Trade & Settle",
    description: "Buy or sell art with instant global settlement in any currency.",
    icon: CreditCard,
    color: "bg-primary" // Dark forest green (was brown)
  }
];

const OnboardingFlow = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      
      // Auto-advancing animation
      intervalRef.current = setInterval(() => {
        setActiveStep(prev => (prev + 1) % steps.length);
      }, 3000);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24" id="how-it-works">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
              INTUITIVE PROCESS
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Your Journey to Digital Art Ownership
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our seamless five-step process transforms how you interact with fine art, 
              making ownership verification and transactions effortless.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative glass-card rounded-xl p-8 mb-12"
          >
            {/* Interactive flow visualization */}
            <div className="flex flex-wrap justify-between items-start relative">
              {/* Connection lines */}
              <div className="absolute top-10 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
              
              {steps.map((step, index) => (
                <div key={step.id} className="w-full sm:w-1/2 md:w-1/5 mb-8 md:mb-0 relative z-10 px-2">
                  <div className={`
                    relative transition-all duration-500
                    ${activeStep === index ? 'scale-110' : 'opacity-70'}
                  `}>
                    <div className={`
                      w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white
                      transition-all duration-500 ${step.color} mb-4
                      ${activeStep === index ? 'shadow-lg' : ''}
                    `}>
                      <step.icon size={24} />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-sm mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-6 -right-3 transform translate-x-1/2">
                        <ArrowRight size={16} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress indicator */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${(activeStep + 1) * (100/steps.length)}%` }}
                ></div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">
                Step {activeStep + 1} of {steps.length}: {steps[activeStep].title}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OnboardingFlow;
