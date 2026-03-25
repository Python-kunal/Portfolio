import { motion as Motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { number: '5+', label: 'Hackathons' },
    { number: '10+', label: 'Projects Built' },
    { number: 'BCA', label: 'DS & AI Student' },
    { number: '100%', label: 'Dedication' },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
        </Motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image / 3D Avatar Placeholder */}
          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl rotate-6" />
              {/* Profile Image */}
              <div className="relative w-full h-full bg-gray-800 rounded-2xl overflow-hidden">
                <img
                  src="/kunal.png"
                  alt="Kunal Gupta"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-8xl flex items-center justify-center h-full">👨‍💻</div>';
                  }}
                />
              </div>
              {/* Floating Elements */}
              <Motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl"
              >
                ⚡
              </Motion.div>
              <Motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center text-2xl"
              >
                🚀
              </Motion.div>
            </div>
          </Motion.div>

          {/* Content */}
          <Motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Aspiring AI Engineer & Full Stack Developer
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              I'm a passionate BCA (Data Science & AI) student at Babu Banarasi Das University,
              on a journey to become an AI Engineer. With a strong foundation in Python,
              Machine Learning, and Full Stack Development, I love building intelligent
              applications that solve real-world problems.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I've participated in 5+ hackathons, constantly pushing my limits and learning
              new technologies. My focus areas include TensorFlow, Neural Networks, and
              building AI-powered web applications using React, Firebase, and MongoDB.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
