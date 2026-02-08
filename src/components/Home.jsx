import Notes from "./Notes.jsx"

const Home = (props) => {
  const {showalert} = props;
  return (
    <div>
      <Notes showalert={showalert}/>
    </div>
  );
};

export default Home;
