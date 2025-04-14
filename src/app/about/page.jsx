import React from 'react'
import styles from "./about.module.css"
import Image from "next/image"

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <div className={styles.imgcontainer} >
          <Image src="https://images.pexels.com/photos/235444/pexels-photo-235444.jpeg?auto=compress&cs=tinysrgb&w=600" alt='profile picture' fill className={styles.img} />
          </div>
          <h1 className={styles.title}>Hii There,</h1>
          
          Welcome to <strong>Travelling with Erill!</strong> {`I’m a wanderer at heart, fueled by a passion for discovering hidden corners of the world and sharing stories that inspire. Whether it’s trekking through misty mountains, savoring street food in bustling markets, or finding serenity in remote villages, I believe every journey teaches us something new. This blog is my love letter to the unpredictable, awe-inspiring adventure we call travel.`}
          <br/>
          <br/>
         {` For me, travel isn’t just about ticking destinations off a list—it’s about connection. I thrive on meeting locals, learning cultures, and embracing the unexpected detours that become lifelong memories. Here, you’ll find honest tales of triumphs and mishaps, practical tips for sustainable travel, and a sprinkle of humor for those "lost-in-translation" moments. Let’s ditch the tourist traps and explore the world with curiosity and kindness!`}


      <div className={styles.sectionContainer}>
      <Image src="https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=" alt='profile picture' fill className={styles.img} />
      </div>

      <b>Join me as I navigate winding trails carved by time and nature</b>{`—from moss-covered paths in ancient forests to sun-scorched ridges where the sky kisses the earth. Together, we’ll chase golden-hour light, not just for the perfect photo, but to capture fleeting moments that remind us how alive we are: a child’s laughter in a Marrakech souk, the whisper of alpine winds, or the dance of fireflies in a Thai jungle. Every journey unveils stories`}<b>—stories of resilience in remote Himalayan villages, of generational recipes shared in Sicilian kitchens, of wildlife thriving in Botswana’s untamed plains—</b>{`that celebrate our planet’s breathtaking diversity.

This space is more than a blog;`} <b>it’s a treasure trove for the curious.</b> {`Dive into detailed gear reviews (because blistered feet shouldn’t slow your spirit), heartfelt reflections on solitude under Patagonian stars, and practical guides for traveling light without sacrificing wonder. Whether you’re a weekend hiker or a full-time nomad, these pages are for those who believe the best journeys ignite the soul as much as they awaken the senses.

Let’s wander wildly—`}<b>getting lost in Kyoto’s cherry-blossom alleys, tracing the footsteps of Inca trailblazers, or sharing fireside tales with Mongolian herders. </b>{`Let’s wonder deeply—about our place in this vast, fragile world and how to tread gently upon it. Because the footprints we leave aren’t just on trails or beaches; they’re etched in the lives we touch and the memories we carry. Adventure isn’t a destination—`}<b>it’s the courage to embrace the unknown, and I’m thrilled to have you here, fellow explorer, as we write this story together.</b>
<br/>
<br/>
<br/>

      </div>

    </div>
  )
}

export default About
