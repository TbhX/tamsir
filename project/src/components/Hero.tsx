import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div id="accueil" className="pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
          >
            <h1>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="block text-base font-semibold text-blue-900"
              >
                Bah Tamsir • Kollab A.
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-1 block text-4xl tracking-tight font-bold sm:text-5xl xl:text-6xl"
              >
                <span className="block text-slate-900">Développement</span>
                <span className="block text-blue-900">d'applications sur mesure</span>
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
            >
              Transformez vos idées en solutions digitales performantes. Expertise en développement web, mobile et intégration API.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left"
            >
              <a
                href="#contact"
                className="group inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-900 hover:bg-blue-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Travaillons ensemble
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
          >
            <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
              <div className="relative block w-full rounded-lg overflow-hidden">
                <img
                  className="w-full rounded-lg transition-transform duration-700 hover:scale-105"
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
                  alt="Developer workspace"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent mix-blend-multiply" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}