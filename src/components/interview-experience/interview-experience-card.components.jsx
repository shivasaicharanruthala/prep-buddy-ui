import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InterviewExperienceComments from './interview-experience-comments.components';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Votes from './interview-experience-votes.components';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { UserContext } from "../../Context/user.context";
import { deleteInterviewExperience } from '../../services/interview-experinces';
import InterviewExperienceModal from './interview-experience-model.components';
import { useContext } from 'react';
import Divider from "@mui/material/Divider";
import './interview-experience-card.styles.scss';
import { CustomAlert } from '../Alerts/alert';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import microsoftLogo from './microsoft.png';
import googleLogo from './google.png';
import amazonLogo from './amazon.jpeg'



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function InterviewExperienceCard({ experience, experiencesLength, setExperiencesLength, handleExpericesEdit }) {
  console.log("tags: ", experience.tags)
  const { userData } = useContext(UserContext)
  const userId = userData.id

  const [expanded, setExpanded] = React.useState(false);
  const [interviewComment, setInterviewComment] = React.useState(experience.comments)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const [isAlertSet, setIsAlertSet] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleInterviewExperienceDelete = (experinceId) => {
    const apiCall = async () => {
      return await deleteInterviewExperience(userId, experinceId)
    }

    apiCall().then(res => {
      setExperiencesLength(experiencesLength - 1)
    }).catch(err => {
      console.log("error: ", err)
      setIsAlertSet(true);
      setAlertMessage("No Interview experience to Delete")
    })
  }

  return (
    <>
      <Card sx={{ width: "1135px", marginTop: '10px', marginBottom: '30px', boxShadow: 4, borderRadius: 3 }}>
        <Divider />
        <CardContent>
          <div className="card-title">
            <CustomAlert isAlertSet={isAlertSet} severity="error" message={alertMessage} />
            <div className="card-header">
              <div>
                <Typography gutterBottom variant="h5" component="div" align="left" style={{ marginLeft: '2px', width: '400px', marginBottom: 1, maxWidth: '800px' }}>
                  {experience.title}
                </Typography>
              </div>
            </div>
            <div className="cardIcons">
              {
                experience.userId === userId ? (
                  <div className="edit-delete-icons">
                    <ModeEditOutlineIcon className="edit-btn" fontSize="medium" color="primary" sx={{ cursor: 'pointer' }} onClick={handleModalOpen} />
                    <DeleteIcon className="delete-btn" fontSize="medium" sx={{ color: red[500], marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleInterviewExperienceDelete(experience.id)} />
                  </div>
                ) : null
              }

              <InterviewExperienceModal isModalOpen={isModalOpen} handleModal={handleModalOpen} experince={experience} handleExpericesEdit={handleExpericesEdit} />
            </div>
          </div>
          <Typography gutterBottom variant="caption" component="div" align="left" style={{ marginLeft: '2px', marginTop: 0, marginBottom: 10,backgroundColor:"#f8f9fa" }}>
            <b>User: </b>{experience.name} &emsp; <b>Interviewed On: </b>{moment(experience.interviewedDate, 'YYYY-MM-DDTHH:mm').format('Do MMMM YYYY')}
          </Typography>
          <Divider />

          <div class="cardRow">
            <div class="votes">
              <Votes experienceId={experience.id} upvotes={experience.upvotes} />
            </div>
            <div class="experience">
              <dl>
                <dt align='left' marginLeft='2px'><b>Application Process</b></dt>
                <dd align='left' marginLeft='2px' >{experience.applicationProcess}</dd>
                <dt align='left' marginLeft='2px'><b>Interview Process</b></dt>
                <dd align='left' marginLeft='2px'>{experience.interviewProcess}</dd>
                <dt align='left' marginLeft='2px'><b>Interview Experience</b></dt>
                <dd align='left' marginLeft='2px'>{experience.interviewExperience}</dd>
              </dl>
            </div>
          </div>
        </CardContent>
        <CardActions disableSpacing sx={{backgroundColor:"#f8f9fa"}}>
          <div className="chip">
            <Chip
              avatar={<Avatar alt="Natacha" src={experience.company === 'Microsoft' ? microsoftLogo : (experience.company === 'Google' ? googleLogo : amazonLogo)}/>}
              label={experience.company}
              color='warning'
              size="medium" sx={{backgroundColor:'rgb(21, 159, 187)'}}/>
          </div>
          <div className='tags-container'>
            {
              experience.tags.split(',').map(tag => <Chip label={tag} color='warning' size="medium" sx={{ margin: 1 , backgroundColor: 'rgb(209, 109, 21)'}} />)
            }
          </div>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>

          <InterviewExperienceComments experinceId={experience.id} comments={experience.comments} setInterviewComment={setInterviewComment} />
        </Collapse>
      </Card>

    </>

  );
}