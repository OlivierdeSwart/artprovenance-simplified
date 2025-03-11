
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Database, FileLock, Globe, ShieldCheck } from 'lucide-react';

const VerificationSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-white" id="technology">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <motion.div custom={0} variants={fadeInUpVariants}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                SECURITY & TRUST
              </span>
            </motion.div>
            <motion.h2 
              custom={1} 
              variants={fadeInUpVariants}
              className="text-3xl md:text-4xl font-serif font-bold mb-6"
            >
              Secure Verification Technology
            </motion.h2>
            <motion.p 
              custom={2} 
              variants={fadeInUpVariants}
              className="text-gray-600 mb-8"
            >
              Our multi-layered approach ensures the highest level of security and verification
              for your valuable art collection, combining private record-keeping with public verification.
            </motion.p>
            
            <div className="space-y-6">
              <motion.div 
                custom={3} 
                variants={fadeInUpVariants}
                className="flex"
              >
                <div className="mr-4 flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Database className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Private Ledger for Art Records</h3>
                  <p className="mt-2 text-gray-600">
                    We securely store all artwork details, provenance history, and ownership records
                    in our private, encrypted ledger system.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                custom={4} 
                variants={fadeInUpVariants}
                className="flex"
              >
                <div className="mr-4 flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <FileLock className="h-6 w-6 text-accent" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Cryptographic Proof Generation</h3>
                  <p className="mt-2 text-gray-600">
                    Our system creates tamper-proof cryptographic verification certificates
                    that are mathematically impossible to forge or alter.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                custom={5} 
                variants={fadeInUpVariants}
                className="flex"
              >
                <div className="mr-4 flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-800/10">
                    <Globe className="h-6 w-6 text-amber-800" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Public Ledger Anchoring (XRPL)</h3>
                  <p className="mt-2 text-gray-600">
                    For maximum security, cryptographic proofs are anchored to a trusted public
                    verification system, creating an immutable record of authenticity.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-amber-800/10 rounded-2xl blur-lg opacity-50"></div>
              <div className="glass-card relative rounded-xl overflow-hidden shadow-xl bg-secondary/80">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-amber-800/5"></div>
                <div className="relative p-8">
                  <div className="mb-8 flex justify-between items-center border-b border-gray-200/50 pb-6">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-gray-900">Certificate of Authenticity</h3>
                      <p className="text-sm text-gray-500 mt-1">Digital Verification Record</p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <ShieldCheck className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Artwork ID</p>
                        <p className="font-medium text-gray-900">DB-25941</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Verification Date</p>
                        <p className="font-medium text-gray-900">March 15, 2023</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Title</p>
                      <p className="font-medium text-gray-900">Serenity in Blue</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Artist</p>
                      <p className="font-medium text-gray-900">Elizabeth Harmon</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Custodian</p>
                      <p className="font-medium text-gray-900">Ardent & Sons Fine Collectibles</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Provenance Status</p>
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                        <p className="font-medium text-green-700">Verified by Custodian</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Cryptographic Fingerprint</p>
                      <p className="font-mono text-xs text-gray-700 break-all bg-gray-50 p-2 rounded">
                        7c3bb1dfc84e9b8e608bdf74cd8b875e8d910f089d1e3d5e9d3af2ba4bc48482
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200/50">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        <p>Last Verified: 2 days ago</p>
                      </div>
                      <div className="bg-accent text-white text-xs px-3 py-1 rounded-full">
                        AUTHENTIC
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -z-10 bottom-0 right-0 transform translate-x-1/3 translate-y-1/3">
              <div className="w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerificationSection;
