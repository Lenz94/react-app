import { useState } from "react";
import TextScramble from "./ui/TextScramble";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import BallScroll from "./ui/BallScroll";

const Intro = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const questionsAndAnswers = [
    {
      question: "What makes you stand out as a Web Developer?",
      answer:
        "With 9 years of experience, I specialize in building highly scalable, fast, and user-friendly web applications. My unique blend of technical expertise and a designer’s eye ensures that I create products that are not only functional but also intuitive and visually appealing.",
    },
    {
      question: "What technologies do you work with?",
      answer:
        "I’m highly proficient in both frontend and backend technologies, including React, Angular, Vue, Node.js, Go, and PHP. This allows me to handle full-stack projects with ease, ensuring seamless integration across all layers.",
    },
    {
      question: "How do you approach problem-solving in web development?",
      answer:
        "I focus on understanding the business needs first and then architect solutions that are efficient, maintainable, and scalable. I believe in clean, well-structured code and always strive to write code that’s both robust and easy to maintain.",
    },
    {
      question: "What type of projects do you enjoy working on?",
      answer:
        "I thrive on projects that challenge both my technical skills and creativity, especially those that allow me to combine my passion for technology and football. I love developing solutions that bring innovative ideas to life, whether it’s a web app, a CRM system, or a sports-related project.",
    },
    {
      question: "Where are you based and what languages do you speak?",
      answer: "Stockholm, Sweden. I speak fluent Swedish, English & Spanish.",
    },
  ];

  const handleToggleQuestion = (index: number) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(index);
    }
  };

  return (
    <>
      <section className="section full-height d-flex">
        <div className="container-fluid my-auto">
          <div className="row h-100">
            <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-center justify-content-center text-center">
              <div className="content-box no-bg intro">
                <h1 className="visually-hidden">Enzo Marcani</h1>
                <h2 className="visually-hidden">Web Developer</h2>
                <TextScramble />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center text-center">
              <div className="content-box light">
                <h3>Hi, I'm Enzo 👋</h3>
                <div className="profile-picture">
                  <img
                    src="/profile.jpg"
                    alt="Enzo Marcani"
                    height={70}
                    width={70}
                  />
                </div>
                <div className="social-links d-flex justify-content-center gap-3 mb-4">
                  <a
                    href="https://www.linkedin.com/in/enzo-marcani-4bb478a2/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="mailto:marcanienzo@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Email Me"
                    title="Send me an email"
                  >
                    <FaEnvelope />
                  </a>
                </div>
                <div className="chat-container">
                  {questionsAndAnswers.map((qa, index) => (
                    <div key={index}>
                      <button
                        className="chat-button"
                        onClick={() => handleToggleQuestion(index)}
                      >
                        {qa.question}
                      </button>
                      <div
                        className={`chat-answer ${
                          activeQuestion === index ? "active" : ""
                        }`}
                      >
                        {activeQuestion === index && <p>{qa.answer}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BallScroll />
    </>
  );
};

export default Intro;
