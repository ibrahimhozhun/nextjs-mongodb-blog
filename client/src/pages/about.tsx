import SEO from "../components/SEO";

const About: React.FC = () => {
  return (
    <>
      <SEO title="About" description="" url="/about" />
      <div className="p-4">
        <h1 className="font-medium text-3xl">About Us</h1>
        <p className="my-4 text-gray-800">
          It is a widely known fact that education starts in family first and it
          is an important part of community. However, in the last years there is
          a remarkable rise in the amount of divorcing and expatriate families
          as we discussed with our project partners, it appears to us common
          problems as partner schools. So students from these families are
          directly influenced negatively because when the family has problems,
          it immediately affects the students’ academic success. We are sure
          that both parents and school intend to succeed the identical aims, in
          other words leading students to learn to be a qualified and
          responsible person and accordingly being successful individuals in
          their lives. We know from different researches that students will
          increase their academic graphics, join the classes regularly, behave
          positively and also they have a favorable manner to school when the
          school and parents work together. We are sure of the fact that the
          collaboration of school-parents and students is the cornerstone of
          qualified education. As partners, students of some of ours are
          children of divorced families; some of ours are children of refugee
          families who are enduring a life with just one parent leaving their
          countries for economic reasons wars and disease etc. Some of the
          students are orphans. Teachers of participating schools’ will learn to
          differentiate between disagreement, various forms of bullying and
          different forms of tension that gives harm to academic success,
          self-esteem and capacity to build community. Teachers will discover
          the good aspects of conflict and learn ways to promote the most
          efficient communication ability using a variety of activities which
          can be simply adjusted to any classroom.
        </p>
        <a
          href="https://firebasestorage.googleapis.com/v0/b/erasmus-blog-a7567.appspot.com/o/others%2FAnti-Bullying%20E-Booklet.pdf?alt=media&token=64465f3b-00a4-4917-9231-cdfd1b3a07a0"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl"
        >
          See Our Booklet
        </a>
      </div>
    </>
  );
};

export default About;
