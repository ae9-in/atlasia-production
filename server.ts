import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
<<<<<<< HEAD
import { Hero, About, Phase, Role, Highlight, CTA, Carousel } from "./src/models.ts";
=======
import dns from "node:dns";
import path from "node:path";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { Hero, About, Phase, Role, Highlight, CTA, Carousel, Testimonial, BootcampMedia, SiteContent } from "./src/models.ts";
import { defaultSiteContent } from "./src/siteContent.ts";
>>>>>>> 888cc4b (gg)

dotenv.config();

async function startServer() {
  const app = express();
<<<<<<< HEAD
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
=======
  const PORT = Number(process.env.PORT) || 3000;
  const uploadsDir = path.resolve("uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const isDbConnected = () => mongoose.connection.readyState === 1;
  const nextId = (prefix: string) => `${prefix}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

  const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

  const baseFallbackHero = {
    title: "ATLASIA",
    subtitle: "THE BOOTCAMP COMPANY",
    tagline: "12-Day Industry Bootcamp: INDUSTRY IMMERSION BOOTCAMP - From Classroom to Corporate Execution",
    primaryButtonText: "Explore Bootcamp",
    primaryButtonLink: "/bootcamp",
    secondaryButtonText: "Join as Student",
    secondaryButtonLink: "/students"
  };
  let fallbackHero = clone(baseFallbackHero);

  const baseFallbackAbout = {
    whoWeAre: "Atlasia is a premier industry immersion bootcamp designed to bridge the gap between academic learning and corporate reality.",
    whyAtlasia: "We provide real-world exposure, mentorship from industry leaders, and hands-on project experience.",
    approach: "Our 15-day intensive program focuses on execution, strategy, and professional growth.",
    vision: "To be a leader in professional immersion training for students",
    mission: "Empowering the next generation of professionals through direct industry engagement."
  };
  let fallbackAbout = clone(baseFallbackAbout);

  const baseFallbackPhases = [
    { _id: "ph1", title: "Phase 1: Foundations", duration: "Day 1-3", description: "Introduction to industry standards and core concepts.", order: 1 },
    { _id: "ph2", title: "Phase 2: Deep Dive", duration: "Day 4-8", description: "Intensive workshops and real-world case studies.", order: 2 },
    { _id: "ph3", title: "Phase 3: Execution", duration: "Day 9-12", description: "Final project delivery and corporate presentation.", order: 3 }
  ];
  let fallbackPhases = clone(baseFallbackPhases);

  const baseFallbackRoles = [
    { _id: "r1", roleName: "Business Analyst", description: "Analyze business needs and document requirements.", responsibilities: ["Requirement Gathering", "Process Mapping", "Stakeholder Management"], registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSdddFRbl4A_gALPwJRA82ZklQpV1cvrg6FyCYak6Vm27QQoIw/viewform", order: 1 },
    { _id: "r2", roleName: "Product Manager", description: "Drive product vision and strategy.", responsibilities: ["Roadmap Planning", "User Research", "Agile Leadership"], registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSdddFRbl4A_gALPwJRA82ZklQpV1cvrg6FyCYak6Vm27QQoIw/viewform", order: 2 },
    { _id: "r3", roleName: "Operations Lead", description: "Optimize internal processes and efficiency.", responsibilities: ["Workflow Optimization", "Resource Allocation", "Performance Tracking"], registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSdddFRbl4A_gALPwJRA82ZklQpV1cvrg6FyCYak6Vm27QQoIw/viewform", order: 3 }
  ];
  let fallbackRoles = clone(baseFallbackRoles);

  const baseFallbackHighlights = [
    { _id: "h1", title: "Industry Mentors", description: "Learn directly from professionals working in top-tier companies.", order: 1 },
    { _id: "h2", title: "Real Projects", description: "Work on actual business problems and deliver tangible solutions.", order: 2 },
    { _id: "h3", title: "Networking", description: "Build lasting connections with peers and industry leaders.", order: 3 }
  ];
  let fallbackHighlights = clone(baseFallbackHighlights);

  const baseFallbackCta = {
    heading: "Ready to Transform Your Career?",
    buttonText: "Register Now",
    buttonLink: "/students"
  };
  let fallbackCta = clone(baseFallbackCta);

  const baseFallbackCarousel = [
    { _id: "c1", imageUrl: "https://picsum.photos/seed/atlasia1/1200/600", title: "Immersive Learning", description: "Experience the corporate world first-hand." },
    { _id: "c2", imageUrl: "https://picsum.photos/seed/atlasia2/1200/600", title: "Expert Guidance", description: "Mentorship from industry veterans." },
    { _id: "c3", imageUrl: "https://picsum.photos/seed/atlasia3/1200/600", title: "Career Growth", description: "Accelerate your professional journey." }
  ];
  let fallbackCarousel = clone(baseFallbackCarousel);

  const baseFallbackTestimonials = [
    { _id: "t1", imageUrl: "https://picsum.photos/seed/testi1/300/300", name: "Ananya Sharma", role: "Business Analyst Intern", quote: "ATLASIA gave me practical confidence and a clear path into corporate projects.", order: 1 },
    { _id: "t2", imageUrl: "https://picsum.photos/seed/testi2/300/300", name: "Rahul Menon", role: "Product Operations Trainee", quote: "The 12-day immersion was intense, structured, and exactly what I needed to level up.", order: 2 },
    { _id: "t3", imageUrl: "https://picsum.photos/seed/testi3/300/300", name: "Sneha Iyer", role: "Program Participant", quote: "From day one to final presentation, every module felt relevant to real work.", order: 3 }
  ];
  let fallbackTestimonials = clone(baseFallbackTestimonials);

  const baseFallbackBootcampMedia = [
    { _id: "bm1", mediaUrl: "https://res.cloudinary.com/dt7hm4udv/image/upload/WhatsApp_Image_2026-03-04_at_4.25.01_PM_noctge.jpg", mediaType: "image", title: "Bootcamp Testimonial 1", description: "Participant moment from ATLASIA bootcamp.", order: 1 },
    { _id: "bm2", mediaUrl: "https://res.cloudinary.com/dt7hm4udv/image/upload/WhatsApp_Image_2026-03-04_at_4.25.01_PM_1_h4nt6d.jpg", mediaType: "image", title: "Bootcamp Testimonial 2", description: "Participant moment from ATLASIA bootcamp.", order: 2 },
    { _id: "bm3", mediaUrl: "https://res.cloudinary.com/dt7hm4udv/image/upload/WhatsApp_Image_2026-03-04_at_4.25.01_PM_2_kykdpt.jpg", mediaType: "image", title: "Bootcamp Testimonial 3", description: "Participant moment from ATLASIA bootcamp.", order: 3 },
    { _id: "bm4", mediaUrl: "https://res.cloudinary.com/dt7hm4udv/image/upload/WhatsApp_Image_2026-03-04_at_4.25.02_PM_r0or20.jpg", mediaType: "image", title: "Bootcamp Testimonial 4", description: "Participant moment from ATLASIA bootcamp.", order: 4 }
  ];
  let fallbackBootcampMedia = clone(baseFallbackBootcampMedia);
  let fallbackSiteContent: Record<string, unknown> = clone(defaultSiteContent);

  const uploadUrl = (fileName: string) => `/uploads/${encodeURIComponent(fileName)}`;
  const imageExtRegex = /\.(jpe?g|png|webp|gif|bmp|avif)$/i;
  const videoExtRegex = /\.(mp4|webm|ogv|ogg)$/i;

  // If users already placed assets in ./uploads, surface them in fallback content automatically.
  try {
    const uploadEntries = await fs.readdir(uploadsDir, { withFileTypes: true });
    const filesWithTime = await Promise.all(
      uploadEntries
        .filter(entry => entry.isFile())
        .map(async (entry) => {
          const fullPath = path.join(uploadsDir, entry.name);
          const stat = await fs.stat(fullPath);
          return { name: entry.name, modifiedAt: stat.mtimeMs };
        }),
    );
    filesWithTime.sort((a, b) => b.modifiedAt - a.modifiedAt);

    const orderedFiles = filesWithTime.map(file => file.name);
    const orderedImageFiles = orderedFiles.filter(name => imageExtRegex.test(name));
    const orderedVideoFiles = orderedFiles.filter(name => videoExtRegex.test(name));

    if (orderedImageFiles.length > 0) {
      fallbackCarousel.splice(
        0,
        fallbackCarousel.length,
        ...orderedImageFiles.slice(0, 10).map((fileName, idx) => ({
          _id: `c${idx + 1}`,
          imageUrl: uploadUrl(fileName),
          title: `Bootcamp Highlight ${idx + 1}`,
          description: "Captured moments from ATLASIA sessions.",
        })),
      );

      fallbackSiteContent = {
        ...fallbackSiteContent,
        aboutPage: {
          sectionImages: Array.from({ length: 5 }, (_, idx) => (
            orderedImageFiles[idx] ? uploadUrl(orderedImageFiles[idx]) : ""
          )),
        },
        studentsPage: {
          experienceImageUrl: uploadUrl(orderedImageFiles[0]),
        },
      };
    }

    const orderedMediaFiles = [...orderedVideoFiles, ...orderedImageFiles];
    if (orderedMediaFiles.length > 0) {
      fallbackBootcampMedia.splice(
        0,
        fallbackBootcampMedia.length,
        ...orderedMediaFiles.slice(0, 10).map((fileName, idx) => ({
          _id: `bm${idx + 1}`,
          mediaUrl: uploadUrl(fileName),
          mediaType: (videoExtRegex.test(fileName) ? "video" : "image") as "video" | "image",
          title: `Bootcamp Media ${idx + 1}`,
          description: "Auto-loaded from uploads folder.",
          order: idx + 1,
        })),
      );
    }
  } catch (err) {
    console.warn("Unable to auto-load uploads folder fallbacks:", (err as Error).message);
  }

  app.use(cors());
  app.use(express.json({ limit: "40mb" }));
  app.use("/uploads", express.static(uploadsDir));

  const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!adminPassword) return res.status(503).json({ error: "ADMIN_PASSWORD is not configured" });
    const key = req.header("x-admin-key");
    if (!key || key !== adminPassword) return res.status(401).json({ error: "Unauthorized" });
    return next();
  };

  const resetFallbacks = () => {
    fallbackHero = clone(baseFallbackHero);
    fallbackAbout = clone(baseFallbackAbout);
    fallbackCta = clone(baseFallbackCta);
    fallbackSiteContent = clone(defaultSiteContent);
    fallbackPhases.splice(0, fallbackPhases.length, ...clone(baseFallbackPhases));
    fallbackRoles.splice(0, fallbackRoles.length, ...clone(baseFallbackRoles));
    fallbackHighlights.splice(0, fallbackHighlights.length, ...clone(baseFallbackHighlights));
    fallbackCarousel.splice(0, fallbackCarousel.length, ...clone(baseFallbackCarousel));
    fallbackTestimonials.splice(0, fallbackTestimonials.length, ...clone(baseFallbackTestimonials));
    fallbackBootcampMedia.splice(0, fallbackBootcampMedia.length, ...clone(baseFallbackBootcampMedia));
  };

  const stripIds = <T extends { _id?: string }>(items: T[]) =>
    items.map(({ _id, ...rest }) => rest);

  app.get("/api/admin/verify", requireAdmin, (req, res) => {
    res.json({ ok: true });
  });
  app.get("/api/admin/status", requireAdmin, (req, res) => {
    res.json({ dbConnected: mongoose.connection.readyState === 1 });
  });
  app.post("/api/admin/reset", requireAdmin, async (_req, res) => {
    try {
      const dbConnected = isDbConnected();
      if (dbConnected) {
        await Promise.all([
          Hero.deleteMany({}),
          About.deleteMany({}),
          CTA.deleteMany({}),
          SiteContent.deleteMany({}),
          Phase.deleteMany({}),
          Role.deleteMany({}),
          Highlight.deleteMany({}),
          Carousel.deleteMany({}),
          Testimonial.deleteMany({}),
          BootcampMedia.deleteMany({}),
        ]);
        await Promise.all([
          (Hero as any).create(clone(baseFallbackHero)),
          (About as any).create(clone(baseFallbackAbout)),
          (CTA as any).create(clone(baseFallbackCta)),
          (SiteContent as any).create({ data: clone(defaultSiteContent) }),
          (Phase as any).insertMany(stripIds(clone(baseFallbackPhases))),
          (Role as any).insertMany(stripIds(clone(baseFallbackRoles))),
          (Highlight as any).insertMany(stripIds(clone(baseFallbackHighlights))),
          (Carousel as any).insertMany(stripIds(clone(baseFallbackCarousel))),
          (Testimonial as any).insertMany(stripIds(clone(baseFallbackTestimonials))),
          (BootcampMedia as any).insertMany(stripIds(clone(baseFallbackBootcampMedia))),
        ]);
      }
      resetFallbacks();
      return res.json({ ok: true, dbReset: dbConnected });
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  });

  app.use("/api", (req, res, next) => {
    if (req.method === "GET") return next();
    return requireAdmin(req, res, next);
  });
>>>>>>> 888cc4b (gg)

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
