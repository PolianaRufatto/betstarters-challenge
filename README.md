# Create a test suite in Cypress to test a registration form with 3 steps and multiple inputs, some test can fail but the script must continue to the end and keep track of the failed tests

## all the tests must contain at least one failing check (more as possible), check the existence of the validator messages

## to install the package you just need node installed and run "npm i" and then "ng serve" then navigate to localhost on port 4200 (as suggested)

- all fields are mandatory
- is not possible to go to the next step if current step is not filled correctly
- when move next, test even previous step by remove one mandatory field 
- ACCOUNT
  - test for valid email minimal lengths (1@2.2) ex: a@aa.bb
  - username min 4 max 20
  - password min 6 max 20
  - repeat min 6 max 20 equal to password
  - currency selected required
- PERSON
  - first name min 2 max 20 no numbers and special chars
  - last name min 2 max 20 no numbers or special chars
  - gender selected required
  - birthdate selection required >= 18 years
- ADDRESS
  - Country selected required
  - (delayed) region selected required
  - region as text min 2 no numbers
  - (delayed) province as select, selected required
  - province as text min 2 no numbers
  - (delayed) city as select, selected required
  - city as text min 2 no numbers
  - selecting back country -> region province city must reset
  - address min 3 max 50
  - zipcode min 2 or 2-2 or 2 space 2, max 10

(hint: Italy has all regions, provinces and cities)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
