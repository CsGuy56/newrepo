import React from 'react'

const About = () => {
  return (
    // <div>About</div>

    // <section className="about">
    //   <main>
    //     <h1>About Us</h1>

    //     <article>
    //       <h4>FruitCart</h4>
    //       <p>
    //         We are FruitCart. The place for most Fresh Fruits on the
    //         enitre earth.
    //       </p>

    //       <p>
    //         Explore the various fruits and Vegetables for the Health freaks . Click below to see the
    //         menu
    //       </p>

    //       {/* <Link to="/">
    //         <RiFindReplaceLine />
    //       </Link> */}
    //     </article>

    //     <div>
    //       <h2>Founder</h2>
    //       <article>
    //         <div>
    //           {/* <img src={me} alt="Founder" /> */}
    //           <h3>Chef Sanju</h3>
    //         </div>

    //         <p>
    //           I am Sanju, the founder of FruitCart. Affiliated to
    //           Good Taste...
    //         </p>
    //       </article>
    //     </div>
    //   </main>
    // </section>

    <div style={styles.container}>
    <h1 style={styles.heading}>About Us</h1>
    <p style={styles.paragraph}>
      Welcome to FruitCart, your number one source for fresh and delicious fruits. We're dedicated to giving you the very best of nature's bounty, with a focus on quality, freshness, and customer service.
    </p>
    <p style={styles.paragraph}>
      Founded in 2024 by Adarsh, FruitCart has come a long way from its beginnings in a home kitchen. When Sanjeev first started out, her passion for providing the best seasonal fruits drove her to quit her day job, do tons of research, and turn hard work and inspiration into a booming online store. We now serve customers all over the country and are thrilled to be a part of the eco-friendly, fair trade wing of the fruit industry.
    </p>
    <p style={styles.paragraph}>
      We hope you enjoy our fruits as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
    </p>
    <p style={styles.signature}>
      Sincerely,<br />
      Adarsh Singh, Founder
    </p>
  </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.5em',
    textAlign: 'center',
    color: '#FF0000',
  },
  paragraph: {
    fontSize: '1.2em',
    lineHeight: '1.6',
    marginBottom: '20px',
    textAlign: 'justify',
  },
  signature: {
    fontSize: '1.2em',
    fontStyle: 'italic',
    textAlign: 'right',
  },
};

export default About