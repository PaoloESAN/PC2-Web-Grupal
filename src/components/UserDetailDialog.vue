<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:model-value', val)"
    backdrop-filter="blur(4px)"
  >
    <q-card
      class="user-detail-card"
      style="width: 780px; max-width: 92vw; border-radius: 16px; overflow: hidden"
    >
      <q-inner-loading :showing="loading" color="primary" class="bg-white">
        <q-spinner-gears size="50px" color="primary" />
        <div class="text-primary text-weight-bold q-mt-md">
          Cargando información del colaborador...
        </div>
      </q-inner-loading>

      <template v-if="!loading && user">
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
            <q-avatar size="120px" class="profile-avatar shadow-5">
              <img :src="user.image" alt="Avatar" />
            </q-avatar>
          </div>

          <div class="text-h4 text-weight-bold">{{ user.firstName }} {{ user.lastName }}</div>
          <div class="text-subtitle1 opacity-80 q-mb-sm">
            {{ user.company?.title || 'Colaborador' }}
          </div>
          <div class="row justify-center q-gutter-sm">
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

        <q-scroll-area style="height: 480px" class="q-pa-md bg-grey-1">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-card flat bordered class="section-card q-mb-md">
                <q-card-section class="q-pa-md">
                  <div class="section-title text-primary q-mb-sm">
                    <q-icon name="person" class="q-mr-sm" /> Datos Personales
                  </div>
                  <q-separator class="q-mb-sm" />
                  <div class="info-row">
                    <span class="info-label">Nombre completo:</span
                    ><span class="info-value">{{ user.firstName }} {{ user.lastName }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Edad:</span
                    ><span class="info-value">{{ user.age }} años</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Cumpleaños:</span
                    ><span class="info-value">{{ formatDate(user.birthDate) }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Género:</span
                    ><span class="info-value">{{ translateGender(user.gender) }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Email:</span
                    ><span class="info-value">{{ user.email }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Teléfono:</span
                    ><span class="info-value">{{ user.phone }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Usuario:</span
                    ><span class="info-value">@{{ user.username }}</span>
                  </div>
                </q-card-section>
              </q-card>

              <q-card flat bordered class="section-card q-mb-md">
                <q-card-section class="q-pa-md">
                  <div class="section-title text-teal-7 q-mb-sm">
                    <q-icon name="fitness_center" class="q-mr-sm" /> Información Física
                  </div>
                  <q-separator class="q-mb-sm" />
                  <div class="info-row">
                    <span class="info-label">Estatura:</span
                    ><span class="info-value">{{ user.height }} cm</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Peso:</span
                    ><span class="info-value">{{ user.weight }} kg</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Grupo sanguíneo:</span
                    ><span class="info-value">{{ user.bloodGroup || 'N/E' }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Color de ojos:</span
                    ><span class="info-value text-capitalize">{{ user.eyeColor || 'N/E' }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Cabello:</span
                    ><span class="info-value text-capitalize"
                      >{{ user.hair?.color || 'N/E' }} ({{ user.hair?.type || 'N/E' }})</span
                    >
                  </div>
                </q-card-section>
              </q-card>

              <q-card flat bordered class="section-card q-mb-md">
                <q-card-section class="q-pa-md">
                  <div class="section-title text-indigo-7 q-mb-sm">
                    <q-icon name="school" class="q-mr-sm" /> Universidad
                  </div>
                  <q-separator class="q-mb-sm" />
                  <div class="info-row" v-if="user.university">
                    <span class="info-label">Institución:</span>
                    <span class="info-value">{{ user.university }}</span>
                  </div>
                  <div class="text-grey-5 text-center q-py-md" v-else>
                    <q-icon name="school" size="32px" class="block q-mb-sm" />
                    <span>No registra información universitaria</span>
                  </div>
                </q-card-section>
              </q-card>

              <q-card flat bordered class="section-card q-mb-md">
                <q-card-section class="q-pa-md">
                  <div class="section-title text-orange-8 q-mb-sm">
                    <q-icon name="currency_bitcoin" class="q-mr-sm" /> Criptomonedas
                  </div>
                  <q-separator class="q-mb-sm" />
                  <template v-if="user.crypto">
                    <div class="info-row">
                      <span class="info-label">Moneda:</span
                      ><span class="info-value text-uppercase">{{ user.crypto.coin }}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Wallet:</span
                      ><span class="info-value font-mono text-caption">{{
                        user.crypto.wallet
                      }}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Red:</span
                      ><span class="info-value">{{ user.crypto.network }}</span>
                    </div>
                  </template>
                  <div class="text-grey-5 text-center q-py-md" v-else>
                    <q-icon name="currency_bitcoin" size="32px" class="block q-mb-sm" />
                    <span>No registra información de criptomonedas</span>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-sm-6">
              <q-card flat bordered class="section-card q-mb-md">
                <q-card-section class="q-pa-md">
                  <div class="section-title text-deep-purple-7 q-mb-sm">
                    <q-icon name="business" class="q-mr-sm" /> Información Laboral
                  </div>
                  <q-separator class="q-mb-sm" />
                  <div class="info-row">
                    <span class="info-label">Empresa:</span
                    ><span class="info-value text-weight-bold">{{
                      user.company?.name || 'N/A'
                    }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Cargo:</span
                    ><span class="info-value">{{ user.company?.title || 'N/A' }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Departamento:</span
                    ><span class="info-value">{{ user.company?.department || 'N/A' }}</span>
                  </div>
                  <div class="info-row" v-if="user.company?.address">
                    <span class="info-label">Dirección laboral:</span>
                    <span class="info-value"
                      >{{ user.company.address.address }}, {{ user.company.address.city }},
                      {{ user.company.address.state }}</span
                    >
                  </div>
                </q-card-section>
              </q-card>

              <q-card flat bordered class="section-card q-mb-md">
                <q-card-section class="q-pa-md">
                  <div class="section-title text-teal-7 q-mb-sm">
                    <q-icon name="home" class="q-mr-sm" /> Dirección
                  </div>
                  <q-separator class="q-mb-sm" />
                  <div class="info-row">
                    <span class="info-label">Dirección:</span
                    ><span class="info-value">{{ user.address?.address || 'N/A' }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Ciudad:</span
                    ><span class="info-value">{{ user.address?.city || 'N/A' }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Estado:</span
                    ><span class="info-value">{{ user.address?.state || 'N/A' }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Código postal:</span
                    ><span class="info-value">{{ user.address?.postalCode || 'N/A' }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">País:</span
                    ><span class="info-value text-weight-bold">{{
                      user.address?.country || 'N/A'
                    }}</span>
                  </div>
                  <div class="info-row" v-if="user.address?.coordinates">
                    <span class="info-label">Coordenadas:</span>
                    <span class="info-value text-caption"
                      >Lat: {{ user.address.coordinates.lat }}, Lng:
                      {{ user.address.coordinates.lng }}</span
                    >
                  </div>
                </q-card-section>
              </q-card>

              <q-card flat bordered class="section-card q-mb-md">
                <q-card-section class="q-pa-md">
                  <div class="section-title text-blue-7 q-mb-sm">
                    <q-icon name="account_balance" class="q-mr-sm" /> Banco
                  </div>
                  <q-separator class="q-mb-sm" />
                  <template v-if="user.bank">
                    <div class="info-row">
                      <span class="info-label">Tarjeta:</span
                      ><span class="info-value"
                        >{{ user.bank.cardType }} (vence: {{ user.bank.cardExpire }})</span
                      >
                    </div>
                    <div class="info-row">
                      <span class="info-label">Número:</span
                      ><span class="info-value font-mono">{{
                        maskCardNumber(user.bank.cardNumber)
                      }}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">Moneda:</span
                      ><span class="info-value text-uppercase">{{ user.bank.currency }}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">IBAN:</span
                      ><span class="info-value font-mono text-caption">{{ user.bank.iban }}</span>
                    </div>
                  </template>
                  <div class="text-grey-5 text-center q-py-md" v-else>
                    <q-icon name="credit_card" size="32px" class="block q-mb-sm" />
                    <span>No registra información bancaria</span>
                  </div>
                </q-card-section>
              </q-card>

              <q-card flat bordered class="section-card q-mb-md">
                <q-card-section class="q-pa-md">
                  <div class="section-title text-grey-7 q-mb-sm">
                    <q-icon name="dns" class="q-mr-sm" /> Datos del Sistema
                  </div>
                  <q-separator class="q-mb-sm" />
                  <div class="info-row">
                    <span class="info-label">IP:</span
                    ><span class="info-value font-mono text-caption">{{ user.ip }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">MAC:</span
                    ><span class="info-value font-mono text-caption">{{ user.macAddress }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Usuario desde:</span
                    ><span class="info-value">{{
                      formatDate(user.registrationDate || user.createdAt)
                    }}</span>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-scroll-area>

        <q-separator />

        <q-card-actions align="right" class="bg-white q-pa-md">
          <q-btn flat label="Cerrar" color="primary" v-close-popup class="text-weight-bold" />
        </q-card-actions>
      </template>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  userId: { type: Number, required: true },
})

defineEmits(['update:modelValue'])

const user = ref(null)
const loading = ref(false)

async function fetchUserDetail(id) {
  loading.value = true
  user.value = null
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`)
    if (!response.ok) throw new Error('Error al obtener información del colaborador')
    user.value = await response.json()
  } catch (error) {
    console.error('Error fetching user detail:', error)
    user.value = null
  } finally {
    loading.value = false
  }
}

watch(
  () => props.modelValue,
  (val) => {
    if (val && props.userId) {
      fetchUserDetail(props.userId)
    }
  },
  { immediate: true },
)

function formatDate(dateString) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
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
}

.profile-avatar {
  border: 4px solid white;
  background-color: white;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
}

.section-card {
  border-radius: 10px;
  background: white;
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
}

.section-title {
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 6px 0;
  border-bottom: 1px solid #f1f5f9;
  &:last-child {
    border-bottom: none;
  }
}

.info-label {
  font-size: 0.85rem;
  color: #64748b;
  flex-shrink: 0;
  margin-right: 8px;
}

.info-value {
  font-size: 0.85rem;
  color: #1e293b;
  text-align: right;
  font-weight: 500;
  word-break: break-word;
  max-width: 60%;
}

.font-mono {
  font-family: 'Courier New', Courier, monospace;
}

.opacity-80 {
  opacity: 0.8;
}

.uppercase {
  text-transform: uppercase;
}

.user-detail-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
</style>
