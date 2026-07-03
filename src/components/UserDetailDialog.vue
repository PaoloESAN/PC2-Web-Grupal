<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:model-value', val)"
    backdrop-filter="blur(4px)"
  >
    <q-card
      class="user-detail-card"
      style="width: 700px; max-width: 90vw; border-radius: 16px; overflow: hidden"
    >
      <div class="profile-header-banner relative-position q-px-md q-py-lg text-white text-center">
        <q-btn
          icon="close"
          flat
          round
          dense
          color="white"
          class="absolute-top-right q-mt-sm q-mr-sm"
          v-close-popup
        />

        <div class="avatar-container q-mb-sm">
          <q-avatar size="110px" class="profile-avatar shadow-5">
            <img :src="user.image" alt="Avatar de empleado" />
          </q-avatar>
        </div>

        <div class="text-h5 text-weight-bold">{{ user.firstName }} {{ user.lastName }}</div>
        <div class="text-subtitle1 opacity-80">{{ user.company?.title || 'Colaborador' }}</div>
        <div class="q-mt-sm row justify-center q-gutter-xs">
          <q-badge color="teal-6" text-color="white" class="q-py-xs q-px-sm text-weight-medium">
            <q-icon name="work" class="q-mr-xs" />
            {{ user.company?.department || 'General' }}
          </q-badge>
          <q-badge
            :color="user.role === 'admin' ? 'red-5' : 'blue-5'"
            text-color="white"
            class="q-py-xs q-px-sm text-weight-medium uppercase"
          >
            {{ user.role || 'Usuario' }}
          </q-badge>
        </div>
      </div>

      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey-7 bg-grey-1"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="personal" icon="person" label="Personal" />
        <q-tab name="contact" icon="contact_phone" label="Contacto" />
        <q-tab name="work" icon="business" label="Laboral" />
        <q-tab name="financial" icon="account_balance_wallet" label="Financiero" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated class="q-py-sm">
        <q-tab-panel name="personal">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-list dense padding>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="cake" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Edad y Cumpleaños</q-item-label>
                    <q-item-label class="text-weight-medium"
                      >{{ user.age }} años ({{ formatDate(user.birthDate) }})</q-item-label
                    >
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon
                      :name="user.gender === 'female' ? 'female' : 'male'"
                      :color="user.gender === 'female' ? 'pink' : 'blue'"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Género</q-item-label>
                    <q-item-label class="text-weight-medium">{{
                      translateGender(user.gender)
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="bloodtype" color="red" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Grupo Sanguíneo</q-item-label>
                    <q-item-label class="text-weight-medium">{{
                      user.bloodGroup || 'No especificado'
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-12 col-sm-6">
              <q-list dense padding>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="straighten" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Estatura y Peso</q-item-label>
                    <q-item-label class="text-weight-medium"
                      >{{ user.height }} cm / {{ user.weight }} kg</q-item-label
                    >
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="visibility" color="teal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Color de Ojos</q-item-label>
                    <q-item-label class="text-weight-medium text-capitalize">{{
                      user.eyeColor || 'No especificado'
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="face" color="orange-8" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Cabello</q-item-label>
                    <q-item-label class="text-weight-medium text-capitalize">
                      {{ user.hair?.color }} ({{ user.hair?.type }})
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="contact">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-list dense padding>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="email" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Correo Electrónico</q-item-label>
                    <q-item-label class="text-weight-medium text-break">
                      <a :href="'mailto:' + user.email" class="text-primary text-decoration-none">{{
                        user.email
                      }}</a>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="phone" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Teléfono Movil</q-item-label>
                    <q-item-label class="text-weight-medium">{{ user.phone }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="school" color="indigo" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Universidad / Educación</q-item-label>
                    <q-item-label class="text-weight-medium text-subtitle2">{{
                      user.university
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-12 col-sm-6">
              <q-list dense padding>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="home" color="teal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Dirección Residencial</q-item-label>
                    <q-item-label class="text-weight-medium">
                      {{ user.address?.address }}
                    </q-item-label>
                    <q-item-label class="text-weight-medium">
                      {{ user.address?.city }}, {{ user.address?.state }} ({{
                        user.address?.postalCode
                      }})
                    </q-item-label>
                    <q-item-label class="text-weight-bold text-teal-9">
                      {{ user.address?.country }}
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-if="user.address?.coordinates">
                  <q-item-section avatar>
                    <q-icon name="place" color="red-6" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Coordenadas GPS</q-item-label>
                    <q-item-label class="text-weight-medium text-caption">
                      Lat: {{ user.address.coordinates.lat }}, Lng:
                      {{ user.address.coordinates.lng }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="work">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-list dense padding>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="business" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Empresa</q-item-label>
                    <q-item-label class="text-weight-bold text-primary">{{
                      user.company?.name
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="badge" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Cargo / Rol Profesional</q-item-label>
                    <q-item-label class="text-weight-medium">{{
                      user.company?.title
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="lan" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Departamento</q-item-label>
                    <q-item-label class="text-weight-medium">{{
                      user.company?.department
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-12 col-sm-6">
              <q-list dense padding>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="pin_drop" color="indigo" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Dirección de Trabajo</q-item-label>
                    <q-item-label class="text-weight-medium">
                      {{ user.company?.address?.address }}
                    </q-item-label>
                    <q-item-label class="text-weight-medium">
                      {{ user.company?.address?.city }}, {{ user.company?.address?.state }}
                    </q-item-label>
                    <q-item-label class="text-weight-bold text-indigo-9">
                      {{ user.company?.address?.country || 'United States' }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="financial">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-list dense padding>
                <q-item-label
                  header
                  class="text-weight-bold text-subtitle2 text-grey-9 q-px-none q-pb-xs"
                >
                  <q-icon name="key" class="q-mr-xs" color="amber-8" /> Datos del Sistema
                </q-item-label>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="account_box" color="grey-7" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Usuario</q-item-label>
                    <q-item-label class="text-weight-medium">@{{ user.username }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="dns" color="grey-7" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Dirección IP</q-item-label>
                    <q-item-label class="text-weight-medium font-mono text-caption">{{
                      user.ip
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="settings_ethernet" color="grey-7" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Dirección MAC</q-item-label>
                    <q-item-label class="text-weight-medium font-mono text-caption">{{
                      user.macAddress
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-12 col-sm-6">
              <q-list dense padding>
                <q-item-label
                  header
                  class="text-weight-bold text-subtitle2 text-grey-9 q-px-none q-pb-xs"
                >
                  <q-icon name="credit_card" class="q-mr-xs" color="blue" /> Información de Nómina
                </q-item-label>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="payment" color="blue" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Tarjeta Registrada</q-item-label>
                    <q-item-label class="text-weight-medium">
                      {{ user.bank?.cardType }} (Vence: {{ user.bank?.cardExpire }})
                    </q-item-label>
                    <q-item-label class="text-weight-medium text-caption font-mono">
                      {{ maskCardNumber(user.bank?.cardNumber) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="currency_exchange" color="teal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Moneda de Pago</q-item-label>
                    <q-item-label class="text-weight-medium text-uppercase">{{
                      user.bank?.currency
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-if="user.crypto">
                  <q-item-section avatar>
                    <q-icon name="currency_bitcoin" color="orange-9" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Crypto Wallet ({{ user.crypto.coin }})</q-item-label>
                    <q-item-label
                      class="text-weight-medium text-caption font-mono ellipsis cursor-pointer"
                    >
                      {{ user.crypto.wallet }}
                      <q-tooltip
                        >{{ user.crypto.wallet }} (Red: {{ user.crypto.network }})</q-tooltip
                      >
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>

      <q-separator />

      <q-card-actions align="right" class="bg-grey-1 q-pa-md">
        <q-btn flat label="Cerrar" color="primary" v-close-popup class="text-weight-bold" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
})

defineEmits(['update:modelValue'])

const activeTab = ref('personal')

function formatDate(dateString) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}

function translateGender(gender) {
  if (gender === 'female') return 'Femenino'
  if (gender === 'male') return 'Masculino'
  return gender
}

function maskCardNumber(cardNumber) {
  if (!cardNumber) return ''
  const str = String(cardNumber)
  if (str.length <= 4) return str
  return '**** **** **** ' + str.slice(-4)
}
</script>

<style lang="scss" scoped>
.profile-header-banner {
  background: linear-gradient(135deg, #1e293b 0%, #0f766e 100%);
  border-bottom: 4px solid var(--q-primary);
}

.avatar-container {
  display: inline-block;
  position: relative;
}

.profile-avatar {
  border: 4px solid white;
  background-color: white;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
}

.text-break {
  word-break: break-all;
}

.font-mono {
  font-family: 'Courier New', Courier, monospace;
}

.opacity-80 {
  opacity: 0.8;
}

.user-detail-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
</style>
