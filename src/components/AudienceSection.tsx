import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CreditCard, Globe, ShieldCheck, Hourglass } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AudienceSection = () => {
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
    <section className="py-24 bg-secondary/50" id="who-we-serve">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
            WHO WE SERVE
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Benefits for Art Enthusiasts
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're collecting or selling fine art, our platform provides 
            specific advantages tailored to your needs.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* For Art Collectors */}
          <motion.div variants={itemVariants} className="glass-card rounded-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 mb-6">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">For Art Collectors</h3>
              <p className="text-gray-600 mb-8">
                Discover a new way to collect with enhanced security, flexibility, and trust.
              </p>
              
              <div className="space-y-5">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Flexible Payments</h4>
                    <p className="text-sm text-gray-600">Choose your preferred currency for transactions.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Secure Ownership</h4>
                    <p className="text-sm text-gray-600">Independently verifiable proof of authenticity and ownership.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-amber-800/10 flex items-center justify-center">
                      <Hourglass className="h-4 w-4 text-amber-800" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Exclusive Access</h4>
                    <p className="text-sm text-gray-600">Gain entry to a trusted fine art ecosystem and exclusive collections.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Button className="w-full bg-accent hover:bg-accent/90 text-white transition duration-300">
                  Start Collecting
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* For Art Sellers */}
          <motion.div variants={itemVariants} className="glass-card rounded-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-accent/10 mb-6">
                <Globe className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">For Art Sellers</h3>
              <p className="text-gray-600 mb-8">
                Expand your reach and streamline your sales process with our global platform.
              </p>
              
              <div className="space-y-5">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Globe className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Global Reach</h4>
                    <p className="text-sm text-gray-600">Sell artwork to a worldwide network of verified collectors.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Fast Settlements</h4>
                    <p className="text-sm text-gray-600">Instant transactions with fewer intermediaries and lower fees.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-amber-800/10 flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-amber-800" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Increased Value</h4>
                    <p className="text-sm text-gray-600">Verified digital provenance enhances market appeal and value.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Button className="w-full bg-accent hover:bg-accent/90 text-white transition duration-300">
                  Start Selling
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AudienceSection;
