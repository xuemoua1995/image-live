import { Fragment, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import {FaRegTrashAlt } from 'react-icons/fa';
import { Box, TextField, FormLabel, Button, IconButton , Grid, Paper } from '@mui/material';
import { TFunction } from 'i18next';

interface LanguageDetailProps {
  t: TFunction<"translation", undefined>;
  language: {
    value: string;
    label: string;
  };
  newProperty: RealEstate;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, lang: string, property: string) => void;
  detail: {
    title: string;
    desc: string[];
  };
  handleAdd: (lang: string) => void;
  handleDelete: (index: number, lang: string) => void;
}

const LanguageDetail: React.FC<LanguageDetailProps> = ({ t, language, newProperty, handleInputChange, detail, handleAdd, handleDelete }) => (
  <Fragment key={language.value}>
    <Box component="div" sx={{ '& > :not(style)': { m: 1, width: '100%', marginBottom: 2 } }} >
       {/* <FormLabel>{t('addNewProperty.detail.titleInputLabel', { language: t(language.label) })}</FormLabel> */}
       <FormLabel>{t('addNewProperty.detail.titleInputLabel')}</FormLabel>
      <TextField
        fullWidth
        style={{ marginBottom: 20}}
        name={`title_${language.value}`}
        // placeholder={t('addNewProperty.detail.titleInputLabel', { language: t(language.label) })}
        placeholder={t('addNewProperty.detail.titleInputLabel')}
        variant="outlined"
        value={detail.title ?? ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, language.value, 'title')}
      />
      {/* <FormLabel>{t('Details in ' + language.label, { lng: language.value })}</FormLabel> */}
      <FormLabel>{t('addNewProperty.detail.Details')}</FormLabel>
      <TextField
        fullWidth
        style={{ marginBottom: 20 }}
        name={`details_${language.value}`}
        // placeholder={t('addNewProperty.detail.detailsInputLabel', { language: t(language.label) })}
        placeholder={t('addNewProperty.detail.detailsInputLabel')}
        variant="outlined"
        value={(detail && detail.desc).join(',') ?? ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, language.value, 'desc')}
      />
      <Button variant="contained" color="primary" onClick={() => handleAdd(language.value)}>
        {t('addNewProperty.detail.addToListButton')}
      </Button>
      <Box>
        <h4>List</h4>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {newProperty.interiors[language.value as keyof { la: { title: string; desc: string[]; }[]; en: { title: string; desc: string[]; }[]; cn: { title: string; desc: string[]; }[]; }].map((item: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Iterable<ReactNode> | null | undefined; desc: any[]; }, index: number) => (
            <Grid item xs={12} md={3} key={index}>
              <Paper style={{ position: 'relative', padding: 25, height: '100%' }}>
                <ul>
                  <li>
                    <strong> {t('addNewProperty.detail.Title')}:</strong> {item.title}
                  </li>
                  <li>
                    <strong> {t('addNewProperty.detail.Description')}:</strong> {item.desc.join(', ')}
                  </li>
                </ul>
                <IconButton
                  onClick={() => handleDelete(index, language.value)}
                  aria-label="delete"
                  style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                >
                  <FaRegTrashAlt fontSize={14} />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box>
          <div style={{height: 20}}></div>
        </Box>
      </Box>
    </Box>
  </Fragment>
);

export default LanguageDetail;
