
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

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
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
    </section>
  );
};

export default FeatureSection;
