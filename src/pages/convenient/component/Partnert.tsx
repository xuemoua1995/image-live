import { Box, Card, CardContent, Rating, Typography, styled } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { FaRegStar } from 'react-icons/fa6';
import { Partner } from '../convenient';
import { useTranslation } from 'react-i18next';

const StyledCard = styled(Card)({
  position: 'relative', // Ensure relative positioning for the card
  cursor: "pointer",
  maxWidth: "90%",
  borderRadius: 16,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Added box-shadow transition
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 24px rgba(88, 44, 134, 0.4)', // Adjusted shadow values for a beautiful effect
  },
});

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledImage = styled('img')({
  marginBottom: 10,
  borderRadius: 16,
  width: '100%',
});

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


const PartnerCard: FC<Partner> = ({ name, imageUrl, location, rating, type }) => {
  

  const { i18n } = useTranslation();
  const lang = i18n.language
  const [value, setValue] = useState<number | null>(rating);
  const [_hover, setHover] = useState(-1);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    // Add event listener to listen for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <StyledCard>
      <StyledCardContent>
        <StyledImage src={imageUrl} alt={name[lang as keyof { en: string; cn: string; la: string; }]} style={{ height: windowSize < 600 ? 'auto' : '400px' }} />
        <Typography variant="h5" component="h4" align="center" gutterBottom>
          <b style={{ color: '#582C86' }}>{name[lang as keyof { en: string; cn: string; la: string; }]}</b>
        </Typography>
        {type == "hotel" && <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rating
            readOnly
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(_event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(_event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<FaRegStar style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
        </Box>}
        
        <Typography variant="body2" component="p" align="center">
           {location.map((value)=>capitalizeFirstLetter(value)).join(", ")}
        </Typography>
        
      </StyledCardContent>
    </StyledCard>
  );
}

export default PartnerCard;
