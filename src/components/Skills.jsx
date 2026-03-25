import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Text3D, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, Suspense } from 'react';

const skills = [
  { name: 'Python', level: 85, color: '#3776AB', icon: '🐍' },
  { name: 'TensorFlow', level: 70, color: '#FF6F00', icon: '🧠' },
  { name: 'NumPy', level: 75, color: '#013243', icon: '🔢' },
  { name: 'Java', level: 70, color: '#ED8B00', icon: '☕' },
  { name: 'MongoDB', level: 75, color: '#47A248', icon: '🍃' },
  { name: 'Firebase', level: 72, color: '#FFCA28', icon: '🔥' },
  { name: 'React', level: 40, color: '#61DAFB', icon: '⚛️' },
  { name: 'HTML', level: 85, color: '#E34F26', icon: '🌐' },
  { name: 'CSS', level: 80, color: '#1572B6', icon: '🎨' },
  { name: 'NoSQL', level: 70, color: '#4DB33D', icon: '📊' },
  { name: 'Git', level: 75, color: '#F05032', icon: '📝' },
  { name: 'AI/ML', level: 65, color: '#8B5CF6', icon: '🤖' },
];

const SkillBar = ({ skill, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{skill.icon}</span>
          <span className="text-white font-medium">{skill.name}</span>
        </div>
        <span className="text-gray-400">{skill.level}%</span>
      </div>
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
        />
      </div>
    </motion.div>
  );
};

const SkillCard = ({ skill, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="relative group"
    >
      <div className="p-6 bg-gray-800/50 border border-white/10 rounded-2xl backdrop-blur-sm text-center hover:border-white/30 transition-all duration-300">
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          className="text-5xl mb-3"
        >
          {skill.icon}
        </motion.div>

        {/* Name */}
        <h4 className="text-white font-medium mb-2">{skill.name}</h4>

        {/* Level Indicator */}
        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < Math.floor(skill.level / 20) ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Skills Grid - Cards View */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-16">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Skills Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gray-800/30 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">Proficiency Levels</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.slice(0, 8).map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
