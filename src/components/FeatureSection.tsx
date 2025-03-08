
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Shield, Banknote, Clock, PieChart, FileStack } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "Global Market Access",
    description: "Connect with collectors worldwide, expanding your potential buyer pool beyond traditional geographic limitations.",
    icon: Globe,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    title: "Verified Provenance",
    description: "Ensure trust and eliminate fraud risks with our digital verification system that tracks the complete history of each artwork.",
    icon: Shield,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    id: 3,
    title: "Enhanced Liquidity",
    description: "Make fine art more tradeable with instant settlements and reduced transaction friction across global markets.",
    icon: Banknote,
    color: "bg-green-100 text-green-600"
  },
  {
    id: 4,
    title: "Faster Settlements",
    description: "Reduce transaction time from weeks to seconds with our streamlined verification process.",
    icon: Clock,
    color: "bg-amber-100 text-amber-600"
  },
  {
    id: 5,
    title: "Fractional Ownership",
    description: "Enable partial investment in high-value artwork, making fine art accessible to more investors.",
    icon: PieChart,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: 6,
    title: "Art as Collateral",
    description: "Unlock financial opportunities backed by verified assets, enabling new possibilities for art-backed lending.",
    icon: FileStack,
    color: "bg-rose-100 text-rose-600"
  }
];

const FeatureSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="py-24 bg-white" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
            VALUE ENHANCEMENT
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            How Digital Authentication Increases Art Value
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our digital provenance system creates tangible benefits that enhance the 
            value, security, and liquidity of your fine art collection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  className="glass-card hover-lift rounded-xl p-6 flex flex-col items-start"
                >
                  <div className={`rounded-full p-3 ${feature.color} mb-5`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="sticky top-24 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-blue-100/30 z-10 pointer-events-none"></div>
              <div className="aspect-[3/4] bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent z-10"></div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-3/4 aspect-square rounded-full bg-primary/5 blur-3xl"></div>
                
                <div className="absolute top-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="glass-card rounded-2xl p-5 shadow-xl mb-8 max-w-xs">
                    <div className="bg-indigo-50 rounded-lg p-4 flex items-center space-x-3 mb-4">
                      <div className="bg-indigo-500 rounded-full p-2 text-white">
                        <PieChart size={16} />
                      </div>
                      <div className="text-sm font-medium text-indigo-700">Fractional Artwork Sale</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Token Price</span>
                        <span className="font-medium">$250.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Value</span>
                        <span className="font-medium">$250,000.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Ownership</span>
                        <span className="font-medium">0.1%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-2xl p-5 shadow-xl max-w-xs">
                    <div className="bg-amber-50 rounded-lg p-4 flex items-center space-x-3 mb-4">
                      <div className="bg-amber-500 rounded-full p-2 text-white">
                        <Clock size={16} />
                      </div>
                      <div className="text-sm font-medium text-amber-700">Settlement Status</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Transaction ID</span>
                        <span className="font-medium">TX-8294</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Time Elapsed</span>
                        <span className="font-medium text-amber-600">3.2 seconds</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Status</span>
                        <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium">Completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
