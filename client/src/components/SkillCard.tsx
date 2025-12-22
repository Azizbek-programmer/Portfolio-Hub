import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SkillCardProps {
  icon: ReactNode;
  name: string;
  level: string;
  color?: string;
  index: number;
}

export function SkillCard({ icon, name, level, color = "text-primary", index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors group"
    >
      <div className={`text-4xl mb-4 ${color} transform group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{name}</h3>
      <p className="text-sm text-muted-foreground font-medium">{level}</p>
    </motion.div>
  );
}
