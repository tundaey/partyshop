npm install
ng build -prod
aws s3 cp dist/ s3://teinvitlaziuamea.ro/ --recursive

