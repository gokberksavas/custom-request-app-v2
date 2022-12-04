<script setup lang="ts">
import { reactive } from 'vue';

interface FormData {
  senderFirstName: string,
  senderLastName: string,
  senderEmail: string,
  senderPhone: string,
}
</script>

<template>
  <div class="form-description"></div>
  <div class="form-wrapper">
    <form class="form">
      <div class="form-item">
        <label for="first-name">Ad</label>
        <input id="first-name" type="text">
      </div>
      <div class="form-item">
        <label for="last-name">Soyad</label>
        <input id="last-name" type="text">
      </div>
      <div class="form-item">
        <label for="email">Email</label>
        <input id="email" type="email">
      </div>
      <div class="form-item">
        <label for="phone">Telefon Numarası</label>
        <input id="phone" type="tel">
      </div>
      <div class="form-item">
        <label for="description">Açıklama</label>
        <textarea id="description"></textarea>
      </div>
    </form>
  </div>
</template>

<style src="@/styles/submission-form.sass">

</style>