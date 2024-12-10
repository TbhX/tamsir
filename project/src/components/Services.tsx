import { Code2, Smartphone, Server, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    name: 'Développement Web',
    description: 'Applications web modernes et performantes avec les dernières technologies.',
    icon: Code2,
  },
  {
    name: 'Développement Mobile',
    description: 'Applications mobiles natives et cross-platform pour iOS et Android.',
    icon: Smartphone,
  },
  {
    name: 'Intégration API',
    description: 'Connexion et synchronisation de vos systèmes avec des API tierces.',
    icon: Server,
  },
  {
    name: 'Maintenance',
    description: 'Support technique et mises à jour continues de vos applications.',
    icon: RefreshCw,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Services() {
  return (
    <div id="services" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:text-center"
        >
          <h2 className="text-base text-blue-900 font-semibold">Services</h2>
          <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Solutions complètes pour vos projets
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
            Une expertise technique pointue pour répondre à tous vos besoins digitaux
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <motion.div 
                key={service.name}
                variants={item}
                className="pt-6"
              >
                <div className="flow-root bg-slate-50 rounded-lg px-6 pb-8 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-900 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-slate-900 tracking-tight">
                      {service.name}
                    </h3>
                    <p className="mt-5 text-base text-slate-500">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}