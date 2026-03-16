import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Hero, About, Phase, Role, Highlight, CTA, Carousel } from "./src/models.ts";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // MongoDB Connection
  const mongoUri = process.env.MONGO_URI;
  if (mongoUri && mongoUri !== "mongodb+srv://...") {
    mongoose.connect(mongoUri)
      .then(() => console.log("Connected to MongoDB"))
      .catch(err => console.error("MongoDB connection error:", err));
  } else {
    console.warn("MONGO_URI not found or invalid. Running with in-memory fallbacks.");
  }

  // API Routes
  
  // Hero
  app.get("/api/hero", async (req, res) => {
    const fallback = {
      title: "ATLASIA",
      subtitle: "THE BOOTCAMP COMPANY",
      tagline: "12-Day Industry Bootcamp: INDUSTRY IMMERSION BOOTCAMP - From Classroom to Corporate Execution",
      primaryButtonText: "Explore Bootcamp",
      primaryButtonLink: "/bootcamp",
      secondaryButtonText: "Join as Student",
      secondaryButtonLink: "/students"
    };
    try {
      if (mongoose.connection.readyState !== 1) return res.json(fallback);
      let data = await (Hero as any).findOne();
      if (!data) data = await (Hero as any).create(fallback);
      res.json(data);
    } catch (err) { res.json(fallback); }
  });

  app.put("/api/hero", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      const hero = await (Hero as any).findOneAndUpdate({}, req.body, { new: true, upsert: true });
      res.json(hero);
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  // About
  app.get("/api/about", async (req, res) => {
    const fallback = {
      whoWeAre: "Atlasia is a premier industry immersion bootcamp designed to bridge the gap between academic learning and corporate reality.",
      whyAtlasia: "We provide real-world exposure, mentorship from industry leaders, and hands-on project experience.",
      approach: "Our 12-day intensive program focuses on execution, strategy, and professional growth.",
      vision: "To be the global leader in professional immersion training.",
      mission: "Empowering the next generation of professionals through direct industry engagement."
    };
    try {
      if (mongoose.connection.readyState !== 1) return res.json(fallback);
      let data = await (About as any).findOne();
      if (!data) data = await (About as any).create(fallback);
      res.json(data);
    } catch (err) { res.json(fallback); }
  });

  app.put("/api/about", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      const about = await (About as any).findOneAndUpdate({}, req.body, { new: true, upsert: true });
      res.json(about);
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  // Phases
  app.get("/api/phases", async (req, res) => {
    const fallback = [
      { _id: "ph1", title: "Phase 1: Foundations", duration: "Day 1-3", description: "Introduction to industry standards and core concepts.", order: 1 },
      { _id: "ph2", title: "Phase 2: Deep Dive", duration: "Day 4-8", description: "Intensive workshops and real-world case studies.", order: 2 },
      { _id: "ph3", title: "Phase 3: Execution", duration: "Day 9-12", description: "Final project delivery and corporate presentation.", order: 3 }
    ];
    try {
      if (mongoose.connection.readyState !== 1) return res.json(fallback);
      const phases = await (Phase as any).find().sort({ order: 1 });
      if (phases.length === 0) {
        await (Phase as any).insertMany(fallback);
        return res.json(fallback);
      }
      res.json(phases);
    } catch (err) { res.json(fallback); }
  });

  app.post("/api/phases", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      const phase = await (Phase as any).create(req.body);
      res.json(phase);
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  app.put("/api/phases/:id", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      const phase = await (Phase as any).findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(phase);
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  app.delete("/api/phases/:id", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      await (Phase as any).findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  // Roles
  app.get("/api/roles", async (req, res) => {
    const fallback = [
      { _id: "r1", roleName: "Business Analyst", description: "Analyze business needs and document requirements.", responsibilities: ["Requirement Gathering", "Process Mapping", "Stakeholder Management"], registerLink: "https://forms.google.com", order: 1 },
      { _id: "r2", roleName: "Product Manager", description: "Drive product vision and strategy.", responsibilities: ["Roadmap Planning", "User Research", "Agile Leadership"], registerLink: "https://forms.google.com", order: 2 },
      { _id: "r3", roleName: "Operations Lead", description: "Optimize internal processes and efficiency.", responsibilities: ["Workflow Optimization", "Resource Allocation", "Performance Tracking"], registerLink: "https://forms.google.com", order: 3 }
    ];
    try {
      if (mongoose.connection.readyState !== 1) return res.json(fallback);
      const roles = await (Role as any).find().sort({ order: 1 });
      if (roles.length === 0) {
        await (Role as any).insertMany(fallback);
        return res.json(fallback);
      }
      res.json(roles);
    } catch (err) { res.json(fallback); }
  });

  app.post("/api/roles", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      const role = await (Role as any).create(req.body);
      res.json(role);
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  app.put("/api/roles/:id", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      const role = await (Role as any).findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(role);
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  app.delete("/api/roles/:id", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      await (Role as any).findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  // Highlights
  app.get("/api/highlights", async (req, res) => {
    const fallback = [
      { _id: "h1", title: "Industry Mentors", description: "Learn directly from professionals working in top-tier companies.", order: 1 },
      { _id: "h2", title: "Real Projects", description: "Work on actual business problems and deliver tangible solutions.", order: 2 },
      { _id: "h3", title: "Networking", description: "Build lasting connections with peers and industry leaders.", order: 3 }
    ];
    try {
      if (mongoose.connection.readyState !== 1) return res.json(fallback);
      const highlights = await (Highlight as any).find().sort({ order: 1 });
      if (highlights.length === 0) {
        await (Highlight as any).insertMany(fallback);
        return res.json(fallback);
      }
      res.json(highlights);
    } catch (err) { res.json(fallback); }
  });

  app.post("/api/highlights", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      const highlight = await (Highlight as any).create(req.body);
      res.json(highlight);
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  app.put("/api/highlights/:id", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      const highlight = await (Highlight as any).findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(highlight);
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  app.delete("/api/highlights/:id", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      await (Highlight as any).findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  // CTA
  app.get("/api/cta", async (req, res) => {
    const fallback = {
      heading: "Ready to Transform Your Career?",
      buttonText: "Register Now",
      buttonLink: "/students"
    };
    try {
      if (mongoose.connection.readyState !== 1) return res.json(fallback);
      let data = await (CTA as any).findOne();
      if (!data) data = await (CTA as any).create(fallback);
      res.json(data);
    } catch (err) { res.json(fallback); }
  });

  app.put("/api/cta", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      const cta = await (CTA as any).findOneAndUpdate({}, req.body, { new: true, upsert: true });
      res.json(cta);
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  // Carousel
  app.get("/api/carousel", async (req, res) => {
    const fallback = [
      { _id: "c1", imageUrl: "https://picsum.photos/seed/atlasia1/1200/600", title: "Immersive Learning", description: "Experience the corporate world first-hand." },
      { _id: "c2", imageUrl: "https://picsum.photos/seed/atlasia2/1200/600", title: "Expert Guidance", description: "Mentorship from industry veterans." },
      { _id: "c3", imageUrl: "https://picsum.photos/seed/atlasia3/1200/600", title: "Career Growth", description: "Accelerate your professional journey." }
    ];
    try {
      if (mongoose.connection.readyState !== 1) return res.json(fallback);
      const carousel = await (Carousel as any).find().sort({ createdAt: -1 });
      if (carousel.length === 0) {
        await (Carousel as any).insertMany(fallback);
        return res.json(fallback);
      }
      res.json(carousel);
    } catch (err) { res.json(fallback); }
  });

  app.post("/api/carousel", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      const item = await (Carousel as any).create(req.body);
      res.json(item);
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  app.delete("/api/carousel/:id", async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: "DB not connected" });
      await (Carousel as any).findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: (err as Error).message }); }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
