import React from "react";
import styles from "./homepage.module.css";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm/NewsletterForm";

const HomePage = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "Hiking the Norwegian Fjords",
      category: "Adventure",
      image:
        "https://media.istockphoto.com/id/1392494719/photo/woman-with-pink-suitcase-and-passport-with-boarding-pass-standing-on-passengers-ladder-of.jpg?s=612x612&w=0&k=20&c=MVUZvIdaUmvRKdG-B5EEGGkIVFj51jss-b6IkxqY3fg=",
    },
    {
      id: 2,
      title: "Street Food Tour in Bangkok",
      category: "Food",
      image:
        "https://media.istockphoto.com/id/1368808461/photo/young-woman-feeding-fish-on-tropical-beach.jpg?s=612x612&w=0&k=20&c=qIdzSEI3BQvGliysV65R5NzHGuhX_4Mq_PU7nBhhsBQ=",
    },
    {
      id: 3,
      title: "Desert Camping in Morocco",
      category: "Culture",
      image:
        "https://media.istockphoto.com/id/1434054606/photo/traveler-backpacker-girl-is-watching-hot-air-balloons-and-the-fairy-chimneys-at-cappadocia.jpg?s=612x612&w=0&k=20&c=Ojnh3lIVszkgDRA9l7U2dvxBWUeORsEhdsyVq5Yjbmw=",
    },
  ];

  return (
    <div className={styles.container}>
      {/* --- Hero Section --- */}
      <section className={styles.hero}>
        <div className={styles.heroImageContainer}>
          <Image
            src="https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Mountain landscape at sunrise"
            fill
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Wander Beyond the Map</h1>
          <p className={styles.heroSubtitle}>
            Discovering hidden gems and sharing authentic travel stories from
            every corner of the globe
          </p>
          <Link href="/blog" className={styles.heroButton}>
            Explore Stories
          </Link>
        </div>
      </section>

      {/* --- Featured Posts --- */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Featured Adventures</h2>
          <div className={styles.featuredGrid}>
            {featuredPosts.map((post) => (
              <article key={post.id} className={styles.featuredCard}>
                <div className={styles.cardImageContainer}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardOverlay} />
                <div className={styles.cardContent}>
                  <span className={styles.cardCategory}>{post.category}</span>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- Traveler's Corner --- */}
      <section className={`${styles.section} ${styles.travelerSection}`}>
        <div className={styles.sectionContent}>
          <div className={styles.travelerContainer}>
            <div className={styles.travelerImageContainer}>
              <Image
                src="https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Cassie hiking"
                fill
                className={styles.travelerImage}
              />
            </div>
            <div className={styles.travelerContent}>
              <h2 className={styles.sectionTitle}>Meet the Traveler</h2>
              <p className={styles.travelerText}>
                I'm Cassie, a full-time wanderer and storyteller. What began as
                solo backpacking trips evolved into a lifelong passion for
                authentic cultural immersion. Join me as I explore offbeat
                trails, connect with local communities, and document the raw
                beauty of our world.
              </p>
              <Link href="/about" className={styles.travelerLink}>
                Read My Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- Newsletter CTA --- */}
      <section className={`${styles.section} ${styles.newsletterSection}`}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Join the Adventure</h2>
          <p className={styles.newsletterText}>
            Get weekly travel stories, exclusive guides, and packing tips
            straight to your inbox
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
