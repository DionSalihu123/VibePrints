type CategoryCardProps = {
  title: string;
  description: string;
};

export default function CategoryCard({
  title,
  description,
}: CategoryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-white/20 transition duration-500 hover:scale-[1.02]">

      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

      <div className="relative z-10">

        <h3 className="text-3xl font-bold mb-4">
          {title}
        </h3>

        <p className="text-zinc-400 leading-relaxed">
          {description}
        </p>

      </div>
    </div>
  );
}
