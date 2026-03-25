import { motion as Motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Physio-App',
    description: 'A mobile app for physiotherapy exercises with real-time feedback and real- time progress tracking. ',
    image: '🤖',
    tags: ['React.js', 'MediaPipe', 'Firebase', 'Material-UI'],
    liveUrl: 'https://physio-app-yz1u-peujm2e8s-python-kunals-projects.vercel.app',
    githubUrl: 'https://github.com/Python-kunal/physio_app',
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 2,
    title: 'Digi-Mental',
    description: 'AI-powered mental health platform offering personalised support and resources for emotional well-being.',
    image: '🛒',
    tags: ['Next.js', 'OpenAI', 'PostgreSQL', 'Prisma'],
    liveUrl: 'https://digimentalmain.vercel.app/',
    githubUrl: 'https://github.com/Python-kunal/DIGIMENTAL',
    color: 'from-green-600 to-emerald-600',
  },
    {
    id: 3,
    title: 'Physio-AI',
    description: 'AI-powered physio assist using pose estimation and ML for personalised exercise guidance.',
    image: '🤖',
    tags: ['React', 'Vite', 'Opencv', 'TensorFlow Lite', 'Numpy', 'Google Generative AI', 'react-webcame'],
    liveUrl: 'https://physio-2y4rckgh8-python-kunals-projects.vercel.app/',
    githubUrl: 'https://github.com/Python-kunal/PHYSIO-AI',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    id: 4,
    title: 'New project',
    description: 'working on it, will be updated soon',
    image: '🎨',
    tags: [],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-orange-600 to-yellow-600',
  },
  {
    id: 5,
    title: 'Food Delivery Site',
    description: 'Online food delivery platform with real-time order tracking and seamless user experience.',
    image: '🛵',
    tags: ['Js', 'HTML', 'CSS', 'Firebase'],
    liveUrl: 'https://fooddelivery-q1bcifhu8-python-kunals-projects.vercel.app',
    githubUrl: 'https://github.com/Python-kunal/Food-delivery',
    color: 'from-red-600 to-pink-600',
  },
  {
    id: 6,
    title: 'Spotify Clone',
    description: 'Spotify-like music player with playlist management and audio visualization.',
    image: '🎵',
    tags: ['HTML', 'JS', 'CSS'],
    liveUrl: 'https://spotifyclone-ey3zvjbsv-python-kunals-projects.vercel.app',
    githubUrl: 'https://github.com/Python-kunal/Spotify-clone',
    color: 'from-indigo-600 to-purple-600',
  },
];

const ProjectCard = ({ project, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gray-800/50 border border-white/10 backdrop-blur-sm">
        {/* Project Image/Icon Area */}
        <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
          <Motion.div
            animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-7xl"
          >
            {project.image}
          </Motion.div>

          {/* Overlay on hover */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
          >
            <a
              href={project.liveUrl}
              className="px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              className="px-4 py-2 border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              GitHub
            </a>
          </Motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-white/10 text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-20 bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent works. Each project is crafted with attention to detail and modern technologies.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
        </Motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
