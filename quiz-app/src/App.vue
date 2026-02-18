<template>
  <div class="quiz-container">
    
    <!-- Pantalla de inicio -->
    <div v-if="!juegoIniciado" class="inicio">
      <h1>🎯 Cuestionario</h1>
      <div class="detalles">
        <h2>📋 Reglas del juego:</h2>
        <ul>
          <li>✓ 5 preguntas de diferentes categorías</li>
          <li>✓ 60 segundos por pregunta</li>
          <li>✓ +2 puntos por respuesta correcta</li>
          <li>✓ -1 punto por respuesta incorrecta</li>
          <li>✓ Muestra la respuesta correcta al finalizar</li>
        </ul>
      </div>
      <button @click="iniciarJuego" class="btn-inicio">Iniciar Juego</button>
    </div>

    <!-- Juego en progreso -->
    <div v-else-if="!juegoTerminado" class="juego">
      <div class="cabecera">
        <div class="puntuacion">⭐ Puntuación: {{ puntuacion }}</div>
        <div class="temporizador" :class="{ 'tiempo-bajo': tiempoRestante <= 10 }">
          ⏱️ {{ tiempoRestante }}s
        </div>
      </div>

      <div class="categoria">{{ preguntaActual.categoria }}</div>
      
      <div class="card-pregunta">
        <h3>{{ preguntaActual.pregunta }}</h3>
        
        <div class="opciones">
          <button
            v-for="(opcion, index) in preguntaActual.opciones"
            :key="index"
            @click="seleccionarRespuesta(index)"
            :disabled="respuestaSeleccionada !== null"
            :class="[
              'btn-opcion',
              getClaseBoton(index)
            ]"
          >
            {{ opcion }}
          </button>
        </div>

        <div v-if="respuestaSeleccionada !== null" class="mensaje" :class="mensajeClase">
          {{ mensaje }}
          <div v-if="!respuestaCorrecta" class="respuesta-correcta">
            Respuesta correcta: {{ preguntaActual.opciones[preguntaActual.correcta] }}
          </div>
        </div>
      </div>

      <div class="progreso">
        Pregunta {{ preguntaIndex + 1 }} de {{ totalPreguntas }}
      </div>
    </div>

    <!-- Pantalla de resultados -->
    <div v-else class="resultados">
      <h2>📊 Resultado</h2>
      <div class="puntuacion-final">
        <span>Puntuación Final:</span>
        <span class="numero">{{ puntuacion }}</span>
      </div>
      
      <div class="resumen-preguntas">
        <h3>Respuestas Correctas:</h3>
        <div v-for="(resultado, index) in resultados" :key="index" class="resultado-item" :class="resultado.correcta ? 'correcto' : 'incorrecto'">
          <div class="pregunta-resumen">{{ index + 1 }}. {{ resultado.pregunta }}</div>
          <div class="respuesta-resumen">
            Tu respuesta: {{ resultado.respuestaUsuario || 'No respondió' }}
          </div>
          <div class="respuesta-correcta-resumen">
            Correcta: {{ resultado.respuestaCorrecta }}
          </div>
          <div class="puntos-resumen">
            {{ resultado.correcta ? '+2' : resultado.respuestaUsuario ? '-1' : '-1 (tiempo)' }}
          </div>
        </div>
      </div>

      <button @click="reiniciarJuego" class="btn-reiniciar">Jugar Nuevamente</button>
    </div>
  </div>
</template>

<script>
import preguntasData from './data/preguntas.json'

export default {
  name: 'App',
  data() {
    return {
      juegoIniciado: false,
      juegoTerminado: false,
      preguntas: preguntasData.preguntas,
      preguntaIndex: 0,
      puntuacion: 0,
      respuestaSeleccionada: null,
      respuestaCorrecta: false,
      mensaje: '',
      mensajeClase: '',
      resultados: [],
      temporizador: null,
      tiempoRestante: 60,
      preguntaActualObj: null
    }
  },
  computed: {
    preguntaActual() {
      return this.preguntas[this.preguntaIndex] || {}
    },
    totalPreguntas() {
      return this.preguntas.length
    }
  },
  methods: {
    iniciarJuego() {
      this.juegoIniciado = true
      this.juegoTerminado = false
      this.preguntaIndex = 0
      this.puntuacion = 0
      this.resultados = []
      this.iniciarTemporizador()
    },
    
    iniciarTemporizador() {
      this.tiempoRestante = 60
      if (this.temporizador) {
        clearInterval(this.temporizador)
      }
      
      this.temporizador = setInterval(() => {
        if (this.respuestaSeleccionada === null) {
          this.tiempoRestante--
          
          if (this.tiempoRestante <= 0) {
            // Tiempo agotado
            clearInterval(this.temporizador)
            this.tiempoAgotado()
          }
        }
      }, 1000)
    },
    
    tiempoAgotado() {
      // Restar 1 punto por tiempo agotado
      this.puntuacion -= 1
      
      // Guardar resultado
      this.resultados.push({
        pregunta: this.preguntaActual.pregunta,
        respuestaUsuario: null,
        respuestaCorrecta: this.preguntaActual.opciones[this.preguntaActual.correcta],
        correcta: false,
        tiempoAgotado: true
      })
      
      // Mostrar mensaje de tiempo agotado
      this.respuestaSeleccionada = -1
      this.respuestaCorrecta = false
      this.mensaje = '¡Tiempo agotado! -1 punto'
      this.mensajeClase = 'error'
      
      // Pasar a la siguiente pregunta después de 2 segundos
      setTimeout(() => {
        this.siguientePregunta()
      }, 2000)
    },
    
    seleccionarRespuesta(index) {
      if (this.respuestaSeleccionada !== null) return
      
      // Detener el temporizador
      clearInterval(this.temporizador)
      
      this.respuestaSeleccionada = index
      this.respuestaCorrecta = (index === this.preguntaActual.correcta)
      
      if (this.respuestaCorrecta) {
        this.puntuacion += 2
        this.mensaje = '¡Felicitaciones! Respuesta correcta +2 puntos'
        this.mensajeClase = 'exito'
      } else {
        this.puntuacion -= 1
        this.mensaje = 'Respuesta incorrecta -1 punto'
        this.mensajeClase = 'error'
      }
      
      // Guardar resultado
      this.resultados.push({
        pregunta: this.preguntaActual.pregunta,
        respuestaUsuario: this.preguntaActual.opciones[index],
        respuestaCorrecta: this.preguntaActual.opciones[this.preguntaActual.correcta],
        correcta: this.respuestaCorrecta
      })
      
      // Pasar a la siguiente pregunta después de 3 segundos
      setTimeout(() => {
        this.siguientePregunta()
      }, 3000)
    },
    
    getClaseBoton(index) {
      if (this.respuestaSeleccionada === null) return ''
      
      if (index === this.preguntaActual.correcta) {
        return 'correcto'
      }
      
      if (index === this.respuestaSeleccionada && index !== this.preguntaActual.correcta) {
        return 'incorrecto'
      }
      
      return ''
    },
    
    siguientePregunta() {
      if (this.preguntaIndex < this.preguntas.length - 1) {
        this.preguntaIndex++
        this.respuestaSeleccionada = null
        this.respuestaCorrecta = false
        this.mensaje = ''
        this.iniciarTemporizador()
      } else {
        // Terminar el juego
        this.juegoTerminado = true
        clearInterval(this.temporizador)
      }
    },
    
    reiniciarJuego() {
      this.juegoIniciado = false
      this.juegoTerminado = false
      this.preguntaIndex = 0
      this.puntuacion = 0
      this.resultados = []
      this.respuestaSeleccionada = null
      clearInterval(this.temporizador)
    }
  },
  beforeUnmount() {
    if (this.temporizador) {
      clearInterval(this.temporizador)
    }
  }
}
</script>