import { useTranslation } from 'react-i18next';
import './style.css'
import { useState } from 'react';
import { LANGS } from '../../../../utils/modal';
import { toast } from 'react-toastify';
import { Container, Grid, Typography } from '@mui/material';
import PropertyAmenityItem from './sub/PropertyAmenityItem';



const Amenities: React.FC<NewPropertyCreate> = ({ initProperty, setProperty }) => {
    const { i18n, t } = useTranslation();  // Initialize useTranslation
    const lang = i18n.language;
    const [langs, _setLangs] = useState(LANGS[lang] || LANGS["en"]);
    // const [singleLang, setSingleLang] = useState({
    //     value: 'la',
    //     label: 'Lao',
    //     icon: '/assets/icons/ic_flag_la.svg',
    // });

    const [singleLang] = useState({
        value: 'la',
        label: 'Lao',
        icon: '/assets/icons/ic_flag_la.svg',
    });

    const [newSurroundla, setnewSurroundla] = useState({
        title: "",
        desc1: "",
        desc2: "",
        icon: ""
    })
    const [newSurrounden, setnewSurrounden] = useState({
        title: "",
        desc1: "",
        desc2: "",
        icon: ""
    })
    const [newSurroundch, setnewSurroundch] = useState({
        title: "",
        desc1: "",
        desc2: "",
        icon: ""
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, language: any, property: string) => {
        if (language.value === 'la') {
            setnewSurroundla((prevSurround) => ({
                ...prevSurround,
                [property]: event.target.value,
            }));
        } else if (language.value === 'en') {
            setnewSurrounden((prevSurround) => ({
                ...prevSurround,
                [property]: event.target.value,
            }));
        } else if (language.value === 'cn') {
            setnewSurroundch((prevSurround) => ({
                ...prevSurround,
                [property]: event.target.value,
            }));
        }
    };
    const handleAdd = (_event: any, language: any) => {
        // Check the selected language and update the surroundings state accordingly
        if (language.value === 'la') {
            if (!newSurroundla.title || !newSurroundla.desc1 || !newSurroundla.desc2 || !newSurroundla.icon) {
                return toast.warn(!newSurroundla.title ? 'Input title, please' : !newSurroundla.desc1 ? 'Input desc1, please' : !newSurroundla.desc2 ? 'Input desc1, please' : "Input icon, please");
            }

            setProperty((prevProperty) => ({
                ...prevProperty,
                surroundings: {
                    ...prevProperty.surroundings,
                    la: [...prevProperty.surroundings.la, newSurroundla],
                },
            }));
            setnewSurroundla({
                title: "",
                desc1: "",
                desc2: "",
                icon: "",
            });
        } else if (language.value === 'en') {
            if (!newSurrounden.title || !newSurrounden.desc1 || !newSurrounden.desc2 || !newSurrounden.icon) {
                return toast.warn(!newSurrounden.title ? 'Input title, please' : !newSurrounden.desc1 ? 'Input desc1, please' : !newSurrounden.desc2 ? 'Input desc1, please' : "Input icon, please");
            }
            setProperty((prevProperty) => ({
                ...prevProperty,
                surroundings: {
                    ...prevProperty.surroundings,
                    en: [...prevProperty.surroundings.en, newSurrounden],
                },
            }));
            setnewSurrounden({
                title: "",
                desc1: "",
                desc2: "",
                icon: "",
            });
        }
        else if (language.value === 'cn') {
            if (!newSurroundch.title || !newSurroundch.desc1 || !newSurroundch.desc2 || !newSurroundch.icon) {
                return toast.warn(!newSurroundch.title ? 'Input title, please' : !newSurroundch.desc1 ? 'Input desc1, please' : !newSurroundch.desc2 ? 'Input desc1, please' : "Input icon, please");
            }
            setProperty((prevProperty) => ({
                ...prevProperty,
                surroundings: {
                    ...prevProperty.surroundings,
                    cn: [...prevProperty.surroundings.cn, newSurroundch],
                },
            }));
            setnewSurroundch({
                title: "",
                desc1: "",
                desc2: "",
                icon: "",
            });
        }
    };

    const handleDelete = (index: number, language: any) => {
        // Check the selected language and update the surroundings state accordingly
        if (language.value === 'la') {
            setProperty((prevProperty) => ({
                ...prevProperty,
                surroundings: {
                    ...prevProperty.surroundings,
                    la: prevProperty.surroundings.la.filter((_item, i) => i !== index),
                },
            }));
        } else if (language.value === 'en') {
            setProperty((prevProperty) => ({
                ...prevProperty,
                surroundings: {
                    ...prevProperty.surroundings,
                    en: prevProperty.surroundings.en.filter((_item, i) => i !== index),
                },
            }));
        } else if (language.value === 'cn') {
            setProperty((prevProperty) => ({
                ...prevProperty,
                surroundings: {
                    ...prevProperty.surroundings,
                    cn: prevProperty.surroundings.cn.filter((_item, i) => i !== index),
                },
            }));
        }
    };


    return (
        <Container maxWidth="xl">
        <Grid item xs={12} sm={12} container direction="row" alignItems="center" justifyContent="space-between" mb={1}>
            <Grid item xs={6} sm={6}>
                <Typography variant="h6">{t('addNewProperty.amenities.title')}</Typography>
            </Grid>

            {/* language */}

            {/* <Grid item xs={6} sm={6} style={{ textAlign: 'right' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {langs.map((language) => (
                        <li key={language.value}
                            style={{
                                margin: '0 10px',
                                cursor: 'pointer',
                                borderBottom: `2px solid ${language.value === singleLang.value ? 'blue' : 'transparent'}`,
                            }}
                            onClick={() => setSingleLang(language)}
                        >
                            <img src={language.icon} alt={language.label} style={{ width: '24px', height: '24px' }} />
                        </li>
                    ))}
                </ul>
            </Grid> */}
        </Grid>
        {/* Give on sub item */}
        <PropertyAmenityItem
            key={singleLang.value}
            t={t}
            langs={langs}
            language={singleLang}
            newSurround={singleLang.value === "la" ? newSurroundla : singleLang.value === "en" ? newSurrounden : newSurroundch}
            handleInputChange={handleInputChange}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            index={singleLang.value}
            newProperty={initProperty}
        />
    </Container>
    )
}
export default Amenities