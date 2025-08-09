import { useEffect, useState } from 'react';
import './ContactBTT.css';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import ChatBox from './Chatbox'; // Import your ChatBox component
import img from '../../assest/conta.png'

const ContactBTT = () => {
  const { t, i18n } = useTranslation();
  const lang =  i18n.language;
  const location = useLocation();
  const [showScroll, setShowScroll] = useState(false);
  const [showChatbox, setShowChatbox] = useState(false); // State to manage chatbox visibility

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 100) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 100) {
      setShowScroll(false);
    }
  };

  const handleChatboxToggle = () => {
    setShowChatbox(!showChatbox); // Toggle chatbox visibility
  };

  
  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () =>  window.removeEventListener('scroll', checkScrollTop);
  }, [location]);
  
  return (
    <>
      <Box sx={{ cursor: 'pointer' }}>
        {showScroll && !showChatbox && (
          <>
            <Box sx={{
              right: { xs: '3%', md: '1%' }
            }} className='btn-to-contact' onClick={handleChatboxToggle}>
              <Box sx={{ 
                right: { xs: '-5px', md: '5px' },
                width: { xs: 70, md: (lang === "la" || lang === "en") ? 80 : 'auto' },
                justifyContent: 'center', 
                textAlign: 'center'
               }} className="contact-icon-text font-small">
                 <Box sx={{padding: 0.2}}>{t("nav.contact")}</Box> 
              </Box>
              <Box sx={{width: {xs: 50, md: 90}}} className='contact-icon'>
                {/*<GrContact />*/}
                 <img src={img} alt="" width='100%' />
              </Box>
               {/*<TiArrowBack className="arrow-icon" />*/}
            </Box>
            <Outlet />
          </>
        )}
      </Box>
      {showChatbox && <ChatBox handleChatboxToggle={handleChatboxToggle} />} 
    </>
  );
};

export default ContactBTT;