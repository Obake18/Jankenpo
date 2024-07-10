export const elementos = {
  Katon: {
    image: require('../assets/icons/fogo.png'),
    kanji: '火',
    nome: 'Fogo',
    vence: 'Fuuton',
    perde: 'Suiton',
    corBase: '#Bf0000',
    descricao: {
      historia: 'O poder do Fogo foi o primeiro a ser dominado pelos antigos humanos, que aprenderam a canalizá-lo através da observação dos vulcões e das chamas. Os sábios antigos descobriram que o Fogo, quando controlado, podia ser usado para forjar armas e ferramentas, aquecer o ambiente e oferecer proteção. Os primeiros talismãs de Fogo eram feitos de pedras vulcânicas e metais aquecidos, imbuídos com símbolos de proteção e poder destrutivo.',
      representacao: 'O Fogo representa a transformação e a destruição criativa. É o elemento da paixão, do desejo e da mudança. Sua força é a capacidade de transformar e renovar, enquanto sua fraqueza é a vulnerabilidade à Água, que pode apagar suas chamas e extinguir seu poder.',
      fraquezasForcas: 'O Fogo vence o Vento (Fuuton) porque o calor intenso pode dispersar a brisa, mas perde para a Água (Suiton) devido à sua capacidade de apagar as chamas.',
    },
  },
  Fuuton: {
    image: require('../assets/icons/vento.png'),
    kanji: '風',
    nome: 'Vento',
    vence: 'Raiton',
    perde: 'Doton',
    corBase: '#588083',
    descricao: {
      historia: 'O elemento Vento foi dominado após longas observações dos padrões atmosféricos e das tempestades. Os antigos sábios usaram o Vento para comunicação através de sinais e para navegação. Runas e talismãs de Vento eram frequentemente feitos de plumas e folhas, simbolizando a liberdade e a rapidez. Os amuletos de Vento foram projetados para trazer velocidade e clareza mental.',
      representacao: 'O Vento simboliza a liberdade, a mudança e a comunicação. Representa a adaptação e a agilidade, sendo um elemento de movimento constante e transformação. Sua força é a capacidade de mover e dispersar, enquanto sua fraqueza está na Terra (Doton), que pode bloquear e absorver seus movimentos.',
      fraquezasForcas: 'O Vento vence o Trovão (Raiton) porque pode dispersar a eletricidade com seu movimento, mas perde para a Terra (Doton), que pode abrandar e neutralizar seus efeitos.',
    },
  },
  Raiton: {
    image: require('../assets/icons/trovão.png'),
    kanji: '雷',
    nome: 'Trovão',
    vence: 'Doton',
    perde: 'Fuuton',
    corBase: '#B28009',
    descricao: {
      historia: 'O poder do Trovão foi entendido pelos antigos através das tempestades e dos relâmpagos que iluminavam o céu. Os talismãs de Trovão eram frequentemente feitos de metais e pedras que conduziam eletricidade. A energia elétrica foi um dos primeiros poderes a ser canalizado para fins de ataque e defesa, usando runas que representavam o poder e a força do céu.',
      representacao: 'O Trovão representa o poder, a intensidade e o impacto súbito. É um símbolo de força e de revelação, trazendo energia e choque. Sua força é a capacidade de causar impactos fortes e repentinos, enquanto sua fraqueza é o Vento (Fuuton), que pode dissipar sua eletricidade.',
      fraquezasForcas: 'O Trovão vence a Terra (Doton) porque a eletricidade pode penetrar e afetar o solo, mas perde para o Vento (Fuuton), que pode dispersar o choque elétrico.',
    },
  },
  Doton: {
    image: require('../assets/icons/terra.png'),
    kanji: '土',
    nome: 'Terra',
    vence: 'Suiton',
    perde: 'Katon',
    corBase: '#873e23',
    descricao: {
      historia: 'O poder da Terra foi canalizado através da observação das rochas e do solo. Os antigos usavam a Terra para construção e defesa, criando amuletos que representavam estabilidade e proteção. Runas de Terra eram feitas de pedras e minerais, e eram usadas para criar barreiras e fortalecer fundações.',
      representacao: 'A Terra simboliza a estabilidade, a força e a durabilidade. Representa a base e o suporte, sendo um elemento de resistência e proteção. Sua força é a capacidade de criar e sustentar estruturas, enquanto sua fraqueza é o Fogo (Katon), que pode derreter e destruir suas estruturas.',
      fraquezasForcas: 'A Terra vence a Água (Suiton) porque pode absorver e conter a umidade, mas perde para o Fogo (Katon), que pode derreter e destruir suas estruturas.',
    },
  },
  Suiton: {
    image: require('../assets/icons/agua.png'),
    kanji: '水',
    nome: 'Água',
    vence: 'Katon',
    perde: 'Raiton',
    corBase: '#3377FF',
    descricao: {
      historia: 'O elemento Água foi dominado pelos antigos que estudaram os rios, mares e a chuva. A Água foi usada para irrigação e purificação, e seus talismãs eram feitos de conchas e algas marinhas. Runas de Água eram usadas para trazer fluidez e adaptação, bem como para proporcionar cura e limpeza.',
      representacao: 'A Água representa a fluidez, a adaptação e a purificação. É um símbolo de transformação e renovação, podendo moldar-se a qualquer forma e trazer vida. Sua força é a capacidade de se adaptar e fluir, enquanto sua fraqueza é o Trovão (Raiton), que pode eletrificar e desestabilizar suas formas líquidas.',
      fraquezasForcas: 'A Água vence o Fogo (Katon) porque pode extinguir as chamas, mas perde para o Trovão (Raiton), que pode energizar e alterar suas propriedades.',
    },
  },
};
