import { Github, Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Sohan",
    role: "Lead Developer and AI Engineer",
    bio: "Full-stack developer passionate about AI and specializes in LLMs and RAG architectures.",
    avatar: "https://ui-avatars.com/api/?name=Sohan&background=2563eb&color=fff",
    github: "#",
    linkedin: "#",
    email: "sohan@example.com",
  },
  {
    name: "Dhanush",
    role: "Research Lead",
    bio: "Specializes in gathering information and giving new ideas.",
    avatar: "https://ui-avatars.com/api/?name=Dhanush&background=7c3aed&color=fff",
    github: "#",
    linkedin: "#",
    email: "dhanush@example.com",
  },
  {
    name: "Vyshnavi",
    role: "Research Lead",
    bio: "Specializes in gathering information and driving research initiatives.",
    avatar: "https://ui-avatars.com/api/?name=Vyshnavi&background=7c3aed&color=fff",
    github: "#",
    linkedin: "#",
    email: "vyshnavi@example.com",
  },
  {
    name: "Anand",
    role: "Presentation Lead",
    bio: "Responsible for crafting all project presentations and ensuring clear communication.",
    avatar: "https://ui-avatars.com/api/?name=Anand&background=db2777&color=fff",
    github: "#",
    linkedin: "#",
    email: "anand@example.com",
  },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-gray-900/50 dark:to-gray-800/50" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Meet the Team
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          We're a group of passionate developers and designers building the future of internal knowledge access.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-white/20 p-4 sm:p-6 text-center hover:scale-105 transition-transform"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 border-4 border-white/50"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400 mb-3">
                {member.role}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4">
                {member.bio}
              </p>
              <div className="flex justify-center gap-3">
                <a href={member.github} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a href={member.linkedin} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a href={`mailto:${member.email}`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}