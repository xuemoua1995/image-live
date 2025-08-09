import { Card, CardContent, Typography, styled } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  Service: Service;
  setTypes: (type: string) => void; // Corrected function signature
}

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  height: '100%',
  maxWidth: 400,
  borderRadius: 16,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    width: '90%', // Adjusted width for smaller screens
  },
  '&:hover': {
    transform: 'scale(1.05)',
    '& h2': {
      color: '#582C86',
    },
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

const StyledImage = styled('img')(({ theme }) => ({
  width: '40%', // Full width by default
  maxWidth: '100%', // Ensure the image doesn't exceed its container
  height: 'auto',
  marginBottom: 10,
  [theme.breakpoints.up('lg')]: {
    width: '15%', // Reduce width on larger screens
  },
}));

const ServiceCard: FC<ServiceCardProps> = ({ Service, setTypes}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language
  return (
    <StyledCard onClick={()=>setTypes(Service.type)}>
      <StyledCardContent>
        <StyledImage src={Service.icon} alt={Service.title[lang as keyof { en: string; cn: string; la: string; }]} />
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontSize: { xs: '0.7rem', lg: '1.5rem' } }}>
          <b> {Service.title[lang as keyof { en: string; cn: string; la: string; }]}</b>
        </Typography>
        <Typography variant="body2" component="p" sx={{display: {xs: 'none', md: 'block'}}}> 
          { Service.subtitle[lang as keyof { en: string; cn: string; la: string; }]}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
}

export default ServiceCard;
