import { Button } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";

const GithubLink = () => {
  return (
    <Button
      onClick={() => window.open('https://github.com/elektrolytmangel/chat-znueni-app', '_blank')}
      variant='outline-dark'
      className='d-flex justify-content-center align-items-center'>
      <FaGithub />
    </Button>
  )
}

export default GithubLink;