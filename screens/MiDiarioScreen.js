import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Ionicons} from '@expo/vector-icons';
import ScalableText from 'react-native-text';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';
import {padWithZero, dateToStrYYYYMMDD} from '../utils/convert';
import API from '../utils/API';
import {enumDiario} from '../utils/types';
import ItemBubble from '../components/ItemBubble';

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

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class MiDiarioScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayNameLong: '',
      /** @type {import('../utils/types').Diario[]} */
      serverData: [],
      markedDates: {},
      listEvents: [],
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    const regs = await API.getBitacora();
    const now = new Date();

    this.setState({
      serverData: regs || [],
      isLoading: false,
    });
    this.onPressGotData({
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      dateString: dateToStrYYYYMMDD(now),
      timestamp: now.getTime(),
    });
  };

  /**
   * @param {number} day
   * @param {number} month
   * @param {number} year
   */
  getDayTitle = (day, month, year) => {
    return `${padWithZero(day)} de ${
      LocaleConfig.locales.es.monthNames[month - 1]
    } de ${year}`;
  };

  /**
   * Evento al selecionar un dia en el calendario
   * @param {import('react-native-calendars').DateObject} selectDay
   */
  onPressGotData(selectDay) {
    // dia seleccionada en texto
    var dayNameLong = this.getDayTitle(
      selectDay.day,
      selectDay.month,
      selectDay.month,
    );

    // Se marca el dia seleccionado y recorre la data obtenida del servidor para crear las marcas en el calendario.
    var markedDates = {};
    this.state.serverData.forEach(reg => {
      markedDates[reg.fecha] = {marked: true};
    });
    if (markedDates[selectDay.dateString] === undefined) {
      markedDates[selectDay.dateString] = {};
    }
    markedDates[selectDay.dateString].selected = true;

    // Para consulta la informacion del dia seleccionado
    let data = this.state.serverData.find(
      reg => reg.fecha === selectDay.dateString,
    );
    if (data === undefined) {
      data = {eventos: [], fecha: ''};
    }

    this.setState({
      listEvents: data.eventos,
      dayNameLong,
      markedDates,
    });
  }

  /** @param {{item: import('../utils/types').Registro}} element*/
  renderItemPreguntas = ({item}) => {
    return (
      <View style={styles.itemPregunta}>
        <Text style={styles.pregunta}>{item.pregunta}</Text>
        <Text style={styles.respuesta}>{item.respuesta}</Text>
      </View>
    );
  };

  /** @param {{item: import('../utils/types').Evento}} element*/
  renderItem = ({item}) => (
    <View style={styles.evento}>
      {item.tipo === enumDiario.viaje && (
        <ItemBubble color={item.color} fill bold>
          {item.texto}
        </ItemBubble>
      )}
      {item.tipo === enumDiario.audiolibro && (
        <ItemBubble color={item.color} likeButton>
          {item.texto}
        </ItemBubble>
      )}
      {item.tipo === enumDiario.meditacion && (
        <ItemBubble color={item.color} likeButton>
          {item.texto}
        </ItemBubble>
      )}
      {item.tipo === enumDiario.diario && (
        <FlatList
          data={item.preguntas}
          renderItem={this.renderItemPreguntas}
          style={styles.eventsContainer}
          keyExtractor={(p, index) => `p${index}`}
        />
      )}
    </View>
  );

  renderListEmpty = _ => {
    return this.state.isLoading ? (
      <ActivityIndicator size="large" color={Colors.primary} />
    ) : (
      <View>
        <ScalableText>No tienes registro durante este día</ScalableText>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Calendar
              onDayPress={day => {
                this.onPressGotData(day);
              }}
              //monthFormat={'MMMM'}
              renderArrow={direction => (
                <Ionicons
                  name={`md-arrow-drop${direction}`}
                  size={24}
                  style={styles.arrow}
                />
              )}
              //hideExtraDays={true}
              //firstDay={1}
              //onPressArrowLeft={substractMonth => substractMonth()}
              //onPressArrowRight={addMonth => addMonth()}
              markedDates={this.state.markedDates}
              theme={{
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
              }}
            />
            <Text style={styles.titleDay}>{this.state.dayNameLong}</Text>
            <FlatList
              data={this.state.listEvents}
              renderItem={this.renderItem}
              style={styles.eventsContainer}
              ListEmptyComponent={this.renderListEmpty}
              keyExtractor={(item, index) => `e${index}`}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: Dims.regularSpace,
  },
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
  evento: {
    marginBottom: 20,
  },
  itemPregunta: {
    borderBottomColor: 'white',
    borderBottomWidth: 3,
    marginBottom: 20,
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
  arrow: {
    color: '#dae0f7',
  },
});
