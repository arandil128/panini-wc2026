// Script para generar stickers.json - ejecutar con: node generate_stickers.js
const fs = require('fs');
const path = require('path');

const fwcStickers = [
  { id: 'FWC1',  number: 1,  description: 'Logo Oficial FIFA World Cup 2026', isSpecial: true },
  { id: 'FWC2',  number: 2,  description: 'Logo Oficial FIFA World Cup 2026 (2/2)', isSpecial: true },
  { id: 'FWC3',  number: 3,  description: 'Mascota Oficial', isSpecial: true },
  { id: 'FWC4',  number: 4,  description: 'Slogan Oficial' },
  { id: 'FWC5',  number: 5,  description: 'Balón Oficial', isSpecial: true },
  { id: 'FWC6',  number: 6,  description: 'Sede: Canadá - Ciudades' },
  { id: 'FWC7',  number: 7,  description: 'Sede: México - Ciudades' },
  { id: 'FWC8',  number: 8,  description: 'Sede: USA - Ciudades' },
  { id: 'FWC9',  number: 9,  description: 'Historia: Uruguay 1930' },
  { id: 'FWC10', number: 10, description: 'Historia: Italia 1934 / Francia 1938' },
  { id: 'FWC11', number: 11, description: 'Historia: Uruguay 1950 / Suiza 1954' },
  { id: 'FWC12', number: 12, description: 'Historia: Suecia 1958 / Chile 1962' },
  { id: 'FWC13', number: 13, description: 'Historia: Inglaterra 1966 / México 1970' },
  { id: 'FWC14', number: 14, description: 'Historia: Alemania 1974 / Argentina 1978' },
  { id: 'FWC15', number: 15, description: 'Historia: España 1982 / México 1986' },
  { id: 'FWC16', number: 16, description: 'Historia: Italia 1990 / USA 1994' },
  { id: 'FWC17', number: 17, description: 'Historia: Francia 1998 / Corea-Japón 2002' },
  { id: 'FWC18', number: 18, description: 'Historia: Alemania 2006 / Sudáfrica 2010' },
  { id: 'FWC19', number: 19, description: 'Historia: Brasil 2014 / Rusia 2018' },
  { id: 'FWC20', number: 20, description: 'Historia: Qatar 2022 / Copa del Mundo', isSpecial: true },
];

// Equipos en orden del álbum, con sus jugadores (null = editable)
// Estructura: [nombre, [jugadores sticker 3..20]]
const teams = [
  ['MEX', 'México', [
    'Guillermo Ochoa', 'Néstor Araujo', 'Edson Álvarez', 'Johan Vásquez', 'Jorge Sánchez',
    'Luis Chávez', 'Alexis Vega', 'Uriel Antuna', 'Hirving Lozano', 'Raúl Jiménez',
    'Santiago Giménez', 'Roberto Alvarado', 'Orbelín Pineda', 'Héctor Herrera', 'Gerardo Arteaga',
    'Henry Martín', 'Carlos Antuna', 'Kevin Álvarez',
  ]],
  ['RSA', 'Sudáfrica', [
    null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null,
  ]],
  ['KOR', 'Corea del Sur', [
    'Kim Seung-gyu', 'Kim Min-jae', 'Jung Woo-young', 'Lee Kang-in', 'Son Heung-min',
    'Hwang Hee-chan', 'Cho Gue-sung', 'Kim Young-gwon', 'Park Hang-seo', 'Hwang In-beom',
    'Na Sang-ho', 'Moon Seon-min', 'Oh Hyeon-gyu', 'Lee Jae-sung', 'Kwon Kyung-won',
    'Kim Tae-hwan', 'Son Jun-ho', 'Lee Chang-geun',
  ]],
  ['CZE', 'República Checa', [
    'Jiří Pavlenka', 'Vladimír Coufal', 'Tomáš Holeš', 'Ondřej Duda', 'Patrik Schick',
    'Tomáš Souček', 'Matěj Kovář', 'Jan Kuchta', 'Adam Hložek', 'Lukáš Provod',
    'Jakub Jankto', 'Ladislav Krejčí', 'Ondřej Lingr', 'Václav Černý', 'Tomáš Čvančara',
    'Jakub Brabec', 'Jan Boril', 'Aleš Matějů',
  ]],
  ['CAN', 'Canadá', [
    'Maxime Crépeau', 'Richie Laryea', 'Steven Vitória', 'Kamal Miller', 'Alistair Johnston',
    'Jonathan Osorio', 'Stephen Eustáquio', 'Tajon Buchanan', 'Alphonso Davies', 'Jonathan David',
    'Cyle Larin', 'Sam Adekugbe', 'Liam Fraser', 'Derek Cornelius', 'Ismaël Koné',
    'Lassi Lappalainen', 'Charles-Andreas Brym', 'Jacob Shaffelburg',
  ]],
  ['BIH', 'Bosnia y Herzegovina', [
    'Ibrahim Šehić', 'Sead Kolašinac', 'Ermin Bičakčić', 'Eldar Civic', 'Aner Hadžić',
    'Miralem Pjanić', 'Edin Džeko', 'Ermedin Demirović', 'Anel Ahmedhodžić', 'Dario Saric',
    'Amar Dedić', 'Vedat Muriqi', null, null, null, null, null, null,
  ]],
  ['QAT', 'Qatar', [
    'Meshaal Barsham', 'Pedro Miguel', 'Bassam Al-Rawi', 'Boualem Khoukhi', 'Homam Ahmed',
    'Karim Boudiaf', 'Akram Afif', 'Hassan Al-Haydos', 'Almoez Ali', 'Abdulaziz Hatem',
    'Mostafa Tarek', 'Ismaeel Mohammad', null, null, null, null, null, null,
  ]],
  ['SUI', 'Suiza', [
    'Yann Sommer', 'Silvan Widmer', 'Manuel Akanji', 'Fabian Schär', 'Ricardo Rodríguez',
    'Granit Xhaka', 'Remo Freuler', 'Xherdan Shaqiri', 'Breel Embolo', 'Haris Seferović',
    'Ruben Vargas', 'Noah Okafor', 'Dan Ndoye', 'Michel Aebischer', 'Fabian Rieder',
    'Ardon Jashari', 'Zeki Amdouni', 'Leonidas Stergiou',
  ]],
  ['BRA', 'Brasil', [
    'Alisson Becker', 'Danilo', 'Marquinhos', 'Gabriel Magalhães', 'Guilherme Arana',
    'Casemiro', 'Lucas Paquetá', 'Raphinha', 'Vinicius Jr.', 'Rodrygo',
    'Gabriel Martinelli', 'Endrick', 'Savinho', 'Bruno Guimarães', 'Militão Éder',
    'Richarlison', 'Antony', 'Gabriel Jesus',
  ]],
  ['MAR', 'Marruecos', [
    'Yassine Bounou', 'Achraf Hakimi', 'Nayef Aguerd', 'Romain Saïss', 'Noussair Mazraoui',
    'Azzedine Ounahi', 'Sofyan Amrabat', 'Hakim Ziyech', 'Youssef En-Nesyri', 'Sofiane Boufal',
    'Abdelhamid Sabiri', 'Ilias Chair', 'Abde Ezzalzouli', 'Selim Amallah', 'Yahia Attiat-Allah',
    'Munir El Haddadi', 'Zakaria Aboukhlal', 'Brahim Díaz',
  ]],
  ['HAI', 'Haití', [
    null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null,
  ]],
  ['SCO', 'Escocia', [
    'Craig Gordon', 'Aaron Hickey', 'Grant Hanley', 'Scott McTominay', 'Andrew Robertson',
    'John McGinn', 'Callum McGregor', 'Ryan Christie', 'Billy Gilmour', 'Lyndon Dykes',
    'Lawrence Shankland', 'Kenny McLean', 'Stuart Armstrong', 'Ryan Jack', 'Ryan Porteous',
    'Kevin Nisbet', 'Che Adams', 'Greg Taylor',
  ]],
  ['USA', 'Estados Unidos', [
    'Matt Turner', 'Sergiño Dest', 'Miles Robinson', 'Tim Weah', 'Antonee Robinson',
    'Weston McKennie', 'Tyler Adams', 'Yunus Musah', 'Christian Pulisic', 'Josh Sargent',
    'Giovanni Reyna', 'Ricardo Pepi', 'Brenden Aaronson', 'Jordan Morris', 'Cameron Carter-Vickers',
    'Folarin Balogun', 'Luca de la Torre', 'Reggie Cannon',
  ]],
  ['PAR', 'Paraguay', [
    'Antony Silva', 'Juan Escobar', 'Gustavo Gómez', 'Fabián Balbuena', 'Santiago Arzamendia',
    'Mathías Villasanti', 'Miguel Almirón', 'Hernán Pérez', 'Ángel Romero', 'Antonio Sanabria',
    'Julio Enciso', 'Alfredo Morales', 'Damián Bobadilla', 'Matías Rojas', 'Celso Ortiz',
    'Jorge Morel', null, null,
  ]],
  ['AUS', 'Australia', [
    'Mat Ryan', 'Nathaniel Atkinson', 'Harry Souttar', 'Kye Rowles', 'Aziz Behich',
    'Aaron Mooy', 'Riley McGree', 'Jackson Irvine', 'Mathew Leckie', 'Mitchell Duke',
    'Craig Goodwin', 'Ajdin Hrustic', 'Martin Boyle', 'Cameron Burgess', 'Awer Mabil',
    'Jason Cummings', 'Marco Tilio', 'Lachlan Wales',
  ]],
  ['TUR', 'Turquía', [
    'Mert Günok', 'Zeki Çelik', 'Merih Demiral', 'Samet Akaydin', 'Ferdi Kadıoğlu',
    'Hakan Çalhanoğlu', 'Orkun Kökçü', 'Arda Güler', 'Kerem Aktürkoğlu', 'Cenk Tosun',
    'Yusuf Yazıcı', 'Abdülkerim Bardakcı', 'Okay Yokuşlu', 'Salih Özcan', 'Cengiz Ünder',
    'Kenan Yıldız', 'Barış Alper Yılmaz', 'Berat Özdemir',
  ]],
  ['GER', 'Alemania', [
    'Manuel Neuer', 'Joshua Kimmich', 'Antonio Rüdiger', 'Nico Schlotterbeck', 'David Raum',
    'Toni Kroos', 'Florian Wirtz', 'Kai Havertz', 'Jamal Musiala', 'Leroy Sané',
    'Niclas Füllkrug', 'Serge Gnabry', 'Thomas Müller', 'Ilkay Gündogan', 'Benjamin Pavard',
    'Maximilian Mittelstädt', 'Chris Führich', 'Pascal Groß',
  ]],
  ['CUW', 'Curazao', [
    null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null,
  ]],
  ['CIV', 'Costa de Marfil', [
    'Yahia Fofana', 'Serge Aurier', 'Wilfried Singo', 'Odilon Kossounou', 'Ghislain Konan',
    'Ibrahim Sangaré', 'Franck Kessié', 'Nicolas Pépé', 'Wilfried Zaha', 'Sébastien Haller',
    'Simon Adingra', 'Jean-Philippe Krasso', 'Karim Konaté', 'Oumar Diakité', 'Lassine Sinayoko',
    null, null, null,
  ]],
  ['ECU', 'Ecuador', [
    'Hernán Galíndez', 'Piero Hincapié', 'Felix Torres', 'Pervis Estupiñán', 'Angelo Preciado',
    'Moisés Caicedo', 'Jeremy Sarmiento', 'Gonzalo Plata', 'Enner Valencia', 'Michael Estrada',
    'Jhon Cifuentes', 'Alan Minda', 'José Cifuentes', 'Kevin Rodríguez', 'Djorkaeff Reasco',
    'Kendry Páez', 'Jordy Caicedo', 'Alexander Domínguez',
  ]],
  ['NED', 'Países Bajos', [
    'Bart Verbruggen', 'Denzel Dumfries', 'Virgil van Dijk', 'Matthijs de Ligt', 'Daley Blind',
    'Frenkie de Jong', 'Tijjani Reijnders', 'Xavi Simons', 'Donyell Malen', 'Memphis Depay',
    'Cody Gakpo', 'Steven Bergwijn', 'Wout Weghorst', 'Nathan Aké', 'Micky van de Ven',
    'Ryan Gravenberch', 'Quinten Timber', 'Justin Kluivert',
  ]],
  ['JPN', 'Japón', [
    'Shuichi Gonda', 'Hiroki Sakai', 'Maya Yoshida', 'Ko Itakura', 'Yuto Nagatomo',
    'Wataru Endo', 'Takefusa Kubo', 'Kaoru Mitoma', 'Daichi Kamada', 'Ritsu Doan',
    'Ayase Ueda', 'Junya Ito', 'Takumi Minamino', 'Hidemasa Morita', 'Shogo Taniguchi',
    'Reo Hatate', 'Koki Machida', 'Mao Hosoya',
  ]],
  ['SWE', 'Suecia', [
    'Robin Olsen', 'Mikael Lustig', 'Andreas Granqvist', 'Victor Lindelöf', 'Ludwig Augustinsson',
    'Albin Ekdal', 'Emil Forsberg', 'Alexander Isak', 'Dejan Kulusevski', 'Viktor Gyökeres',
    'Jesper Karlsson', 'Mattias Svanberg', 'Sebastian Larsson', 'Gustav Svensson', 'Isak Hien',
    'Joel Pohjanpalo', 'Anthony Elanga', 'Jens Cajuste',
  ]],
  ['TUN', 'Túnez', [
    'Aymen Dahmen', 'Montassar Talbi', 'Yassine Meriah', 'Dylan Bronn', 'Ali Maaloul',
    'Aissa Laidouni', 'Ellyes Skhiri', 'Naim Sliti', 'Wahbi Khazri', 'Youssef Msakni',
    'Seifeddine Jaziri', 'Hannibal Mejbri', 'Mohamed Dräger', null, null,
    null, null, null,
  ]],
  ['BEL', 'Bélgica', [
    'Thibaut Courtois', 'Timothy Castagne', 'Jan Vertonghen', 'Wout Faes', 'Leander Dendoncker',
    'Kevin De Bruyne', 'Youri Tielemans', 'Dodi Lukebakio', 'Lois Openda', 'Romelu Lukaku',
    'Jérémy Doku', 'Alexis Saelemaekers', 'Charles De Ketelaere', 'Amadou Onana', 'Arthur Theate',
    'Johan Bakayoko', 'Loïs Openda', 'Aster Vranckx',
  ]],
  ['EGY', 'Egipto', [
    'Mohamed El-Shenawy', 'Ahmed Hegazy', 'Mahmoud Hamdy', 'Omar Kamal', 'Ahmed Sayed',
    'Mahmoud Trezeguet', 'Tarek Hamed', 'Mohamed Elneny', 'Mohamed Salah', 'Omar Marmoush',
    'Mostafa Mohamed', 'Amr El-Sulaya', 'Ramadan Sobhi', null, null,
    null, null, null,
  ]],
  ['IRN', 'Irán', [
    'Alireza Beiranvand', 'Shoja Khalilzadeh', 'Milad Mohammadi', 'Majid Hosseini', 'Ehsan Hajsafi',
    'Ahmad Nourollahi', 'Ali Gholizadeh', 'Mehdi Taremi', 'Sardar Azmoun', 'Alireza Jahanbakhsh',
    'Karim Ansarifard', 'Saman Ghoddos', 'Morteza Pouraliganji', null, null,
    null, null, null,
  ]],
  ['NZL', 'Nueva Zelanda', [
    'Oliver Sail', 'Liberato Cacace', 'Winston Reid', 'Tommy Smith', 'Tim Payne',
    'Clayton Lewis', 'Callum McCowatt', 'Elijah Just', 'Chris Wood', 'Marko Stamenic',
    'Alex Rufer', 'Ben Old', 'Joe Bell', null, null,
    null, null, null,
  ]],
  ['ESP', 'España', [
    'Unai Simón', 'Dani Carvajal', 'Aymeric Laporte', 'Robin Le Normand', 'Alejandro Grimaldo',
    'Pedri', 'Gavi', 'Rodri', 'Lamine Yamal', 'Álvaro Morata',
    'Nico Williams', 'Fermín López', 'Fabián Ruiz', 'Mikel Merino', 'Martín Zubimendi',
    'Bryan Gil', 'Joselu', 'Alejandro Balde',
  ]],
  ['CPV', 'Cabo Verde', [
    null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null,
  ]],
  ['KSA', 'Arabia Saudita', [
    'Mohammed Al-Owais', 'Sultan Al-Ghannam', 'Ali Al-Bulaihi', 'Abdulelah Al-Amri', 'Yasser Al-Shahrani',
    'Mohamed Kanno', 'Sami Al-Najei', 'Salem Al-Dawsari', 'Firas Al-Buraikan', 'Saleh Al-Shehri',
    'Hattan Bahebri', 'Abdullah Radif', 'Nawaf Al-Abed', null, null,
    null, null, null,
  ]],
  ['URU', 'Uruguay', [
    'Sergio Rochet', 'José María Giménez', 'Ronald Araújo', 'Sebastián Coates', 'Mathías Olivera',
    'Federico Valverde', 'Rodrigo Bentancur', 'Nicolás De La Cruz', 'Facundo Pellistri', 'Darwin Núñez',
    'Edinson Cavani', 'De Arrascaeta', 'Maxi Gómez', 'Matías Vecino', 'José Luis Rodríguez',
    'Agustín Canobbio', 'Luciano Rodríguez', 'Emiliano Martínez URU',
  ]],
  ['FRA', 'Francia', [
    'Mike Maignan', 'Jules Koundé', 'Raphaël Varane', 'Ibrahima Konaté', 'Theo Hernández',
    'Aurélien Tchouaméni', 'Eduardo Camavinga', 'Antoine Griezmann', 'Kylian Mbappé', 'Ousmane Dembélé',
    'Marcus Thuram', 'Randal Kolo Muani', 'Kingsley Coman', 'Adrien Rabiot', 'Dayot Upamecano',
    'William Saliba', 'Bradley Barcola', 'Warren Zaïre-Emery',
  ]],
  ['SEN', 'Senegal', [
    'Édouard Mendy', 'Kalidou Koulibaly', 'Abdou Diallo', 'Youssouf Sabaly', 'Formose Mendy',
    'Idrissa Gueye', 'Pape Matar Sarr', 'Sadio Mané', 'Ismaïla Sarr', 'Boulaye Dia',
    'Nicolas Jackson', 'Lamine Camara', 'Iliman Ndiaye', 'Pathé Ciss', 'Moussa Niakhaté',
    'Habib Diallo', null, null,
  ]],
  ['IRQ', 'Irak', [
    null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null,
  ]],
  ['NOR', 'Noruega', [
    'Ørjan Nyland', 'Omar Elabdellaoui', 'Andreas Christensen NOR', 'Leo Östigård', 'Birger Meling',
    'Martin Ødegaard', 'Sander Berge', 'Mats Møller Dæhli', 'Mohamed Elyounoussi', 'Erling Haaland',
    'Alexander Sørloth', 'Kristian Thorstvedt', 'Patrick Berg', 'Jens Petter Hauge', 'Håkon Evjen',
    'Andreas Søderlund', null, null,
  ]],
  ['ARG', 'Argentina', [
    'Emiliano Martínez', 'Nahuel Molina', 'Cristian Romero', 'Nicolás Otamendi', 'Nicolás Tagliafico',
    'Rodrigo De Paul', 'Alexis Mac Allister', 'Enzo Fernández', 'Lionel Messi', 'Lautaro Martínez',
    'Julián Álvarez', 'Paulo Dybala', 'Ángel Di María', 'Leandro Paredes', 'Germán Pezzella',
    'Thiago Almada', 'Valentín Carboni', 'Giovanni Lo Celso',
  ]],
  ['ALG', 'Argelia', [
    'Rais M\'Bolhi', 'Aïssa Mandi', 'Ramy Bensebaïni', 'Djamel Benlamri', 'Mehdi Zeffane',
    'Ismaël Bennacer', 'Adlène Guedioura', 'Youcef Belaïli', 'Riyad Mahrez', 'Islam Slimani',
    'Baghdad Bounedjah', 'Sofiane Feghouli', 'Andy Delort', 'Haris Belkebla', null,
    null, null, null,
  ]],
  ['AUT', 'Austria', [
    'Patrick Pentz', 'Stefan Posch', 'David Alaba', 'Gernot Trauner', 'Philipp Mwene',
    'Konrad Laimer', 'Marcel Sabitzer', 'Christoph Baumgartner', 'Florian Grillitsch', 'Marko Arnautovic',
    'Michael Gregoritsch', 'Patrick Wimmer', 'Nicolas Seiwald', 'Romano Schmid', 'Maximilian Wöber',
    'Florian Kainz', 'Guido Burgstaller', null,
  ]],
  ['JOR', 'Jordania', [
    null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null,
  ]],
  ['POR', 'Portugal', [
    'Diogo Costa', 'João Cancelo', 'Pepe', 'Rúben Dias', 'Nuno Mendes',
    'Bernardo Silva', 'Bruno Fernandes', 'Vitinha', 'Cristiano Ronaldo', 'Rafael Leão',
    'João Félix', 'Gonçalo Ramos', 'Diogo Jota', 'Rúben Neves', 'João Palhinha',
    'Pedro Neto', 'Francisco Conceição', 'Matheus Nunes',
  ]],
  ['COD', 'R. D. del Congo', [
    null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null,
  ]],
  ['UZB', 'Uzbekistán', [
    null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null,
  ]],
  ['COL', 'Colombia', [
    'Camilo Vargas', 'Daniel Muñoz', 'Dávinson Sánchez', 'Yerry Mina', 'Johan Mojica',
    'Juan Guillermo Cuadrado', 'Jefferson Lerma', 'Richard Ríos', 'Luis Díaz', 'Falcao',
    'Rafael Santos Borré', 'James Rodríguez', 'Jhon Arias', 'Mateus Uribe', 'Wilmar Barrios',
    'Jorge Carrascal', 'Duván Zapata', 'Déiver Machado',
  ]],
  ['ENG', 'Inglaterra', [
    'Jordan Pickford', 'Kyle Walker', 'John Stones', 'Harry Maguire', 'Luke Shaw',
    'Jude Bellingham', 'Declan Rice', 'Bukayo Saka', 'Phil Foden', 'Harry Kane',
    'Cole Palmer', 'Ollie Watkins', 'Trent Alexander-Arnold', 'Conor Gallagher', 'Marc Guéhi',
    'Anthony Gordon', 'Eberechi Eze', 'Kobbie Mainoo',
  ]],
  ['CRO', 'Croacia', [
    'Dominik Livaković', 'Josip Juranović', 'Dejan Lovren', 'Joško Gvardiol', 'Borna Sosa',
    'Luka Modrić', 'Mateo Kovačić', 'Marcelo Brozović', 'Ivan Perišić', 'Nikola Vlašić',
    'Andrej Kramarić', 'Mario Pašalić', 'Bruno Petković', 'Josip Stanišić', 'Martin Erlić',
    'Luka Sučić', 'Marko Pjaca', 'Lovro Majer',
  ]],
  ['GHA', 'Ghana', [
    'Lawrence Ati-Zigi', 'Tariq Lamptey', 'Daniel Amartey', 'Alexander Djiku', 'Gideon Mensah',
    'Thomas Partey', 'Iddrisu Baba', 'Jordan Ayew', 'André Ayew', 'Mohammed Kudus',
    'Osman Bukari', 'Antoine Semenyo', 'Inaki Williams', 'Abdul Fatawu Issahaku', 'Joel Fameyeh',
    null, null, null,
  ]],
  ['PAN', 'Panamá', [
    'Luis Mejía', 'Fidel Escobar', 'Harold Cummings', 'Andrés Andrade', 'Éric Davis',
    'Adalberto Carrasquilla', 'Aníbal Godoy', 'Rolando Blackburn', 'Ismael Díaz', 'Cecilio Waterman',
    'Édgar Bárcenas', 'Alberto Quintero', 'Gabriel Torres', 'Armando Cooper', null,
    null, null, null,
  ]],
];

// También sección Coca-Cola (CC)
const ccStickers = Array.from({length: 14}, (_, i) => ({
  id: `CC${i+1}`,
  number: i+1,
  description: `Figurita Exclusiva Coca-Cola CC${i+1}`,
  isSpecial: true,
}));

// Generar estructura completa
const sections = [];

// Sección FWC
sections.push({
  id: 'FWC',
  name: 'FWC Especiales',
  order: 0,
  stickers: fwcStickers.map(s => ({ ...s, sectionId: 'FWC' })),
});

// Secciones de equipos
teams.forEach(([code, name, players], idx) => {
  const stickers = [];
  // Sticker 1: Escudo
  stickers.push({
    id: `${code}1`, sectionId: code, number: 1,
    description: 'Escudo', isBadge: true, isSpecial: false, isTeamPhoto: false,
  });
  // Sticker 2: Foto grupal (foil)
  stickers.push({
    id: `${code}2`, sectionId: code, number: 2,
    description: 'Foto Grupal (Foil)', isTeamPhoto: true, isSpecial: true, isBadge: false,
  });
  // Stickers 3-20: Jugadores
  players.forEach((playerName, pi) => {
    stickers.push({
      id: `${code}${pi + 3}`, sectionId: code, number: pi + 3,
      playerName: playerName || null,
      isSpecial: false, isBadge: false, isTeamPhoto: false,
    });
  });
  sections.push({ id: code, name, order: idx + 1, stickers });
});

// Sección CC
sections.push({
  id: 'CC',
  name: 'Coca-Cola Exclusivas',
  order: teams.length + 1,
  stickers: ccStickers.map(s => ({ ...s, sectionId: 'CC' })),
});

const output = { sections };
const outPath = path.join(__dirname, 'stickers.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');

const total = sections.reduce((acc, s) => acc + s.stickers.length, 0);
console.log(`✅ stickers.json generado: ${sections.length} secciones, ${total} figuritas`);
