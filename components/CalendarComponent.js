import React, {Component} from 'react';
import {Text, StyleSheet, Arrow, View, FlatList} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import ItemBubble from '../components/ItemBubble';
import {Ionicons} from '@expo/vector-icons';

const theme = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: '#dae0f7',
  selectedDayTextColor: '#494c6b',
  textDisabledColor: '#d9e1e8',
  dotColor: '#8087a7',
  arrowColor: '#dae0f7',
  monthTextColor: '#333',
  indicatorColor: 'blue',
  textDayFontFamily: 'MyriadPro-Regular',
  textMonthFontFamily: 'MyriadPro-Regular',
  textDayHeaderFontFamily: 'MyriadPro-Regular',
};

// @ts-ignore
const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar',
    'Abr',
    'May',
    'Ju',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Domingo',
    'Lundes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ],
  dayNamesShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

const getCurrentDayString = () => {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  return `${year}-${month > 9 ? month : '0' + month}-${
    day > 9 ? day : '0' + day
  }`;
};

const getDayTiyle = () => {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  return `${day > 9 ? day : '0' + day} de ${monthNames[month - 1]} de ${year}`;
};

export default class CalendarComponent extends Component {
  constructor(props) {
    super(props);
    const today = getCurrentDayString();
    const todayLongName = getDayTiyle();
    this.serverData = null;
    this.state = {
      markedDates: {
        [today]: {selected: true},
      },
      listEvents: [
        {tipo: 'V', texto: 'Finalicé: ¿Qué es ser feliz?', bg: '#fdd58d'},
        {
          tipo: 'D',
          preguntas: [
            {
              pregunta: 'Lo que más aprecio en mi vida es:',
              respuesta:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            },
            {
              pregunta: 'Mi actitud frente al cambio es:',
              respuesta:
                'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
            },
            {
              pregunta: 'Las dificultades en la vida sirven para:',
              respuesta:
                'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            },
          ],
        },
        {tipo: 'M', texto: 'Meditación: Ansiedad y estrés', bg: '#d9def8'},
        {tipo: 'A', texto: 'Inicio: Aprendiendo a Meditar', bg: '#50628f'},
      ],
      dayName: today,
      dayNameLong: todayLongName,
    };
  }

  /**
   * Se marca el dia seleccionado y recorre la data obtenida del servidor para crear las marcas en el calendario.
   * @param {string} dateString
   */
  setSelectedDay(dateString) {
    var marks = {};
    this.serverData.forEach(reg => {
      marks[reg.fecha] = {marked: true};
    });
    if (marks[dateString] === undefined) {
      marks[dateString] = {};
    }
    marks[dateString].selected = true;
    this.setState({
      markedDates: marks,
    });
  }
  componentDidMount() {
    // TODO llamada al servidor, la estructura esta por definir (escucho propuestas)
    this.serverData = [
      {
        fecha: '2019-11-30',
        eventos: [
          {tipo: 'V', texto: 'Finalicé: ¿Qué es ser feliz?', bg: '#fdd58d'},
          {
            tipo: 'D',
            preguntas: [
              {
                pregunta: 'Lo que más aprecio en mi vida es:',
                respuesta:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              },
              {
                pregunta: 'Mi actitud frente al cambio es:',
                respuesta:
                  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
              },
              {
                pregunta: 'Las dificultades en la vida sirven para:',
                respuesta:
                  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
              },
            ],
          },
          {tipo: 'M', texto: 'Meditación: Ansiedad y estrés', bg: '#d9def8'},
          {tipo: 'A', texto: 'Inicio: Aprendiendo a Meditar', bg: '#50628f'},
        ],
      },
      {
        fecha: '2019-12-02',
        eventos: [
          {tipo: 'M', texto: 'Meditación: Meditación: básica'},
          {tipo: 'V', texto: 'Inicié: Ansiedad y estrés', bg: '#d9def8'},
          {tipo: 'A', texto: 'La Aventura Espiritual', bg: '#82d3eb'},
        ],
      },
      {
        fecha: '2019-12-05',
        eventos: [
          {tipo: 'V', texto: 'Inicié: Ansiedad y estrés', bg: '#d9def8'},
        ],
      },
      {
        fecha: '2019-12-10',
        eventos: [{tipo: 'V', texto: 'Inicié: Enfócate', bg: '#d9f6f0'}],
      },
      {
        fecha: '2019-12-12',
        eventos: [{tipo: 'A', texto: 'La Aventura Espiritual', bg: '#82d3eb'}],
      },
      {
        fecha: '2019-12-17',
        eventos: [
          {tipo: 'M', texto: 'Meditación: Meditación avanzada'},
          {
            tipo: 'D',
            preguntas: [
              {
                pregunta: 'Lo que más aprecio en mi vida es:',
                texto:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              },
              {
                respuesta: 'Mi actitud frente al cambio es:',
                texto:
                  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
              },
              {
                respuesta: 'Las dificultades en la vida sirven para:',
                texto:
                  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
              },
            ],
          },
        ],
      },
      {
        fecha: '2019-12-18',
        eventos: [
          {tipo: 'V', texto: 'Finalicé: ¿Qué es ser feliz?', bg: '#fdd58d'},
        ],
      },
      {
        fecha: '2019-12-19',
        eventos: [{tipo: 'A', texto: 'La Aventura Espiritual', bg: '#82d3eb'}],
      },
      {
        fecha: '2019-12-22',
        eventos: [{tipo: 'M', texto: 'Meditación: Meditación básica'}],
      },
      {
        fecha: '2019-12-23',
        eventos: [
          {tipo: 'V', texto: 'Finalicé: ¿Qué es ser feliz?', bg: '#fdd58d'},
        ],
      },
      {
        fecha: '2019-12-24',
        eventos: [{tipo: 'M', texto: 'Meditación para el estrés'}],
      },
      {
        fecha: '2019-12-25',
        eventos: [
          {tipo: 'M', texto: 'Meditación: Meditación básica'},
          {tipo: 'A', texto: 'La Aventura Espiritual', bg: '#82d3eb'},
        ],
      },
      {
        fecha: '2019-12-28',
        eventos: [
          {tipo: 'V', texto: 'Inicié: Relaciones Personales', bg: '#efbfba'},
        ],
      },
    ];

    this.setSelectedDay(getCurrentDayString());
  }

  /**
   * Evento al selecionar un dia en el calendario
   * @param {import('react-native-calendars').DateObject} day
   */
  onPressGotData(day) {
    this.setState({
      dayName: day.dateString,
      dayNameLong:
        day.day + ' de ' + monthNames[day.month - 1] + ' de ' + day.year,
    });
    this.setSelectedDay(day.dateString);
    // Para consultar la informacion del dia
    let registro = this.serverData.find(reg => reg.fecha === day.dateString);
    if (registro !== undefined) {
      this.setState({
        listEvents: registro.eventos,
      });
    } else {
      this.setState({
        listEvents: [],
      });
    }
  }

  _handleClick = item => {
    this.props.navigation.navigate(item.title);
  };

  renderItem = ({item}) => {
    if (item.tipo === 'V') {
      return (
        <>
          <View style={styles.evento}>
            <ItemBubble
              style={styles.marginVertical}
              color={item.bg}
              status={'viajeDiario'}>
              {item.texto}
            </ItemBubble>
          </View>
        </>
      );
    } else if (item.tipo === 'M') {
      return (
        <>
          <View style={styles.evento}>
            <ItemBubble
              style={styles.marginVertical}
              color={'#8088a5'}
              status={'meditar-audiolibro'}>
              {item.texto}
            </ItemBubble>
          </View>
        </>
      );
    } else if (item.tipo === 'A') {
      return (
        <>
          <View style={styles.evento}>
            <ItemBubble
              style={styles.marginVertical}
              color={item.bg}
              status={'meditar-audiolibro'}>
              {item.texto}
            </ItemBubble>
          </View>
        </>
      );
    } else if (item.tipo === 'D') {
      console.log(item.preguntas);
      return (
        <>
          <View style={styles.evento}>
            <FlatList
              data={item.preguntas}
              renderItem={this.renderItemPreguntas}
              style={styles.eventsContainer}
            />
          </View>
        </>
      );
    }
  };
  renderItemPreguntas = ({item}) => {
    return (
      <>
        <View style={styles.itemPregunta}>
          <Text style={styles.pregunta}>{item.pregunta}</Text>
          <Text style={styles.respuesta}>{item.respuesta}</Text>
        </View>
      </>
    );
  };

  render() {
    return (
      <>
        <Calendar
          onPressArrowLeft={substractMonth => substractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          firstDay={1}
          hideExtraDays={true}
          markedDates={this.state.markedDates}
          monthFormat={'MMMM'}
          onDayPress={day => {
            this.onPressGotData(day);
          }}
          renderArrow={direction => {
            if (direction == 'left')
              return (
                <Ionicons
                  name={'md-arrow-dropleft'}
                  size={24}
                  style={styles.arrow}
                />
              );
            if (direction == 'right')
              return (
                <Ionicons
                  name={'md-arrow-dropright'}
                  size={24}
                  style={styles.arrow}
                />
              );
          }}
          theme={theme}
        />
        <Text style={styles.titleDay}>{this.state.dayNameLong}</Text>
        <FlatList
          data={this.state.listEvents}
          renderItem={this.renderItem}
          style={styles.eventsContainer}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  titleDay: {
    fontSize: 18,
    letterSpacing: 1.11,
    lineHeight: 27,
    marginTop: Dims.regularSpace,
    marginHorizontal: 20,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
    paddingTop: 40,
  },
  eventsContainer: {
    padding: Dims.regularSpace,
  },
  pregunta: {
    fontFamily: 'MyriadPro-Bold',
    fontSize: 17,
    lineHeight: 25,
    color: Colors.gray,
  },
  respuesta: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: Colors.gray,
  },
  itemPregunta: {
    borderBottomColor: 'white',
    borderBottomWidth: 3,
    marginBottom: 20,
  },
  marginVertical: {
    marginVertical: 10,
  },
  evento: {
    marginBottom: 20,
  },
  arrow: {
    color: '#dae0f7',
  },
});
