<template>
    <div>

        <v-form ref="form" v-model="valid" @submit.prevent="!idItem ? registrar() : editar()">
            <v-row class="mt-4">
                
                <v-col md="4">
                    <v-autocomplete :rules="[v => !!v]" v-model="pregunta.codigo" autocomplete="off" :items="codigos" item-text="codigo" item-value="codigo" hide-details outlined label="Código"></v-autocomplete>
                </v-col>

                <v-col md="8">
                    <v-autocomplete :rules="[v => !!v]" v-model="pregunta.id_pregunta" autocomplete="off" :items="preguntas" item-text="nombre" item-value="id" hide-details outlined label="Pregunta"></v-autocomplete>
                </v-col>

                <v-col md="2">
                    <v-text-field :rules="[v => !!v]" v-model="pregunta.bien" autocomplete="off" hide-details outlined label="Bien"></v-text-field>
                </v-col>

                <v-col md="2">
                    <v-text-field :rules="[v => !!v]" v-model="pregunta.regular" autocomplete="off" hide-details outlined label="Regular"></v-text-field>
                </v-col>

                <v-col md="2">
                    <v-text-field :rules="[v => !!v]" v-model="pregunta.mal" autocomplete="off" hide-details outlined label="Mal"></v-text-field>
                </v-col>

                <v-col md="2">
                    <v-text-field :rules="[v => !!v]" v-model="pregunta.no_encara" autocomplete="off" hide-details outlined label="No encara el problema"></v-text-field>
                </v-col>

                <v-col md="2">
                    <v-text-field :rules="[v => !!v]" v-model="pregunta.ns_nr" autocomplete="off" hide-details outlined label="NS/NR"></v-text-field>
                </v-col>

            </v-row>

            <v-row>
                <v-col class="text-center">
                    <v-btn @click="$emit('closeModal')" class="mr-2" color="secondary">
                        CANCELAR
                    </v-btn>

                    <v-btn type="submit" color="primary">
                        GUARDAR
                    </v-btn>

                </v-col>
            </v-row>
        </v-form>

    </div>
</template>

<script>

    import request from '@/functions/request.js'
    // eslint-disable-next-line no-unused-vars
    import alert from '@/functions/alert.js'

    export default {
        props: {
            idItem: String,
            tabla: String
        },
        data(){
            return{
                preguntas: [],
                codigos: [],
                pregunta: {

                },
                valid: true
            }
        },
        methods: {

            obtener_datos_form(){

                const data = {

                    url: 'datos_form.php',
                    data: null

                }

                request.post(data)
                .then((response) => {

                    this.codigos = response.data.codigos
                    this.preguntas = response.data.preguntas

                })

            },
            registrar(){

                this.$refs.form.validate()

                    if (this.valid) {
                        
                        const data = {
                            url: 'registrar_ponderacion.php',
                            data: this.pregunta
                        }

                        request.post(data)
                        // eslint-disable-next-line no-unused-vars
                        .then((response) => {

                            this.$emit('updateTable')
                            this.$emit('closeModal')
                            this.pregunta = {}
                            this.$refs.form.resetValidation()
                            this.valid = true
                            
                        })

                    }

            },
            detalle(){

                const data = {
                    url: 'obtener_detalle.php',
                    data: {
                        id: this.idItem,
                        tabla: this.tabla
                    }
                }

                request.post(data)
                .then((response) => {
                    console.log(response.data);
                    this.pregunta = response.data
                })

            },
            editar(){

                const data = {
                    url: 'editar_ponderacion.php',
                    data: this.pregunta
                }

                request.post(data)
                // eslint-disable-next-line no-unused-vars
                .then((response) => {

                    // alert.show_alert(response.data)
                    // .then((result) => {

                    //     if (result) {
                            
                    //     }

                    // })

                    this.$emit('updateTable')
                    this.$emit('closeModal')
                })

            }
        },
        watch: {
            idItem: function(val){

                if (val) {
                    this.detalle()
                }else{
                    console.log('empty');
                    this.pregunta = {}
                    this.$refs.form.resetValidation()
                    this.valid = true
                }

            }
        },
        mounted(){

            if (this.idItem) {
                this.detalle()
            }else{

                this.pregunta = {}
                this.$refs.form.resetValidation()
                this.valid = true

            }
            this.obtener_datos_form()

        }
    

    }
</script>