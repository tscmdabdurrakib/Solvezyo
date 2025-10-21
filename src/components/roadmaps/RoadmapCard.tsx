import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Roadmap } from '@/data/roadmaps';

interface RoadmapCardProps {
  roadmap: Roadmap;
  delay?: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap, delay = 0 }) => {
  const Icon = roadmap.icon;

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0, 123, 255, 0.3)" }}
      className="h-full"
    >
      <Card className="flex flex-col h-full justify-between p-4">
        <CardHeader className="pb-2">
          <div className="flex items-center mb-2">
            {Icon && <Icon className="h-6 w-6 text-primary mr-3" />}
            <CardTitle className="text-lg font-semibold">{roadmap.title}</CardTitle>
          </div>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {roadmap.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-2 pt-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="secondary">{roadmap.category}</Badge>
            <Badge 
              variant={
                roadmap.difficulty === "Beginner" ? "outline" : 
                roadmap.difficulty === "Intermediate" ? "default" : 
                "destructive"
              }
            >
              {roadmap.difficulty}
            </Badge>
          </div>
          <Link to={`/roadmaps/${roadmap.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RoadmapCard;