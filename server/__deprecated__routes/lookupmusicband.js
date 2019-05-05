/** @author Ilya Kopyl
 * @email ikopyl@mail.sfsu.edu */
const axios = require('axios');
const express = require('express');
const router = express.Router();
const moment = require('moment');

const responseTemplate = require('../ResponseTemplate');

/* enums, to select the album covers image resulution.
The returned urls to album covers have resolution 100x100,
however the urls can be modified to access images with higher resolution 
(unfortunately, there is no direct API to access those pictures directly, 
  so I have to hack).

The default filename format is: 100x100bb.jpg
It can be changed to any of the following:
64x64bb.jpg
170x170bb.jpg
340x340bb.jpg
600x600bb.jpg
1200x1200bb.jpg
1400x1400bb.jpg
*/
const imageResolutions = {
  tiny: '64',
  smaller: '100',
  small: '170',
  medium: '340',
  large: '600',
  larger: '1200',
  enormous: '1400',
  default: '100',
}

const errMsg = {
  noQueryKey: 'Invalid request: no query parameters',
  noQueryValue: `Invalid request: no values for 'placeholder' parameter given`,
}

const unless = (test, then) => {
  if (!test) then();
}

router.get('/', (req, res) => {
  const noQueryKey = Object.keys(req.query).length === 0;
  let noQueryValue = true;
  let noQueryValueDynamicErrMsg = null;
  
  const url = `https://itunes.apple.com/search?term=${req.query.name}&entity=album`;
  console.log(req.query);
  axios.get(url)
    .then((networkResponse) => {

      console.log(`HTTP status code: ${networkResponse.status}`);
      let originalAlbums = [];

      unless(noQueryKey, () => {
        const queryKey = Object.keys(req.query)[0];
        const queryValue = Object.values(req.query)[0];

        noQueryValue = queryValue.length === 0;
        noQueryValueDynamicErrMsg = errMsg.noQueryValue.replace('placeholder', `${queryKey}`);

        originalAlbums = networkResponse.data.results
          .filter(album =>
            album.artistName.toUpperCase() == queryValue.toUpperCase())
          .map(album => new Object({ 
              description: album.artistName + ' - ' + album.collectionName,
              albumName: album.collectionName,
              artistName: album.artistName,
              artworkUrl: album.artworkUrl100,
              artworkUrlTiny: album.artworkUrl100.replace(/100/g, imageResolutions.tiny),
              artworkUrlSmaller: album.artworkUrl100.replace(/100/g, imageResolutions.smaller),
              artworkUrlSmall: album.artworkUrl100.replace(/100/g, imageResolutions.small),
              artworkUrlMedium: album.artworkUrl100.replace(/100/g, imageResolutions.medium),
              artworkUrlLarge: album.artworkUrl100.replace(/100/g, imageResolutions.large),
              artworkUrlLarger: album.artworkUrl100.replace(/100/g, imageResolutions.larger),
              artworkUrlEnormous: album.artworkUrl100.replace(/100/g, imageResolutions.enormous),
          }));
      });

      responseTemplate.date = moment().format('YYYY-MM-DDThh:mm:ss.SSSZ');
      responseTemplate.description = 
        'This endpoint queries iTunes API ' 
        + 'to retrieve an album information '
        + 'about a musician or a music band. '
        + 'Required query parameter is \'name\'. '
        + 'Example of use: lookupmusicband?name=the beatles';
      responseTemplate.params = req.query;

      responseTemplate.response = noQueryKey ? errMsg.noQueryKey : 
                                    (noQueryValue ? noQueryValueDynamicErrMsg : originalAlbums);
      noQueryKey || noQueryValue ? res.status(400).json(responseTemplate) : res.json(responseTemplate);
    })
    .catch((err) => {
      console.log(err);
      throw new Error();
  });
});

module.exports = router;
