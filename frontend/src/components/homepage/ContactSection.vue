<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
    name: '',
    email: '',
    message: ''
});

const submitForm = () => {
    // Optionally handle the submission via API or email service
    console.log('Question Submitted:', form.value);
    
    // Clear the form after submission
    form.value.name = '';
    form.value.email = '';
    form.value.message = '';
};
</script>

<template>
    <section class=" px-6 py-32 min-h-[60vh] flex flex-col items-start justify-start">
        
        <h2 class="text-4xl md:text-8xl font-magilio font-bold text-red-400/90 mb-12 text-left uppercase tracking-widest drop-shadow-md border-b-2 border-red-400/90">
            Got a Question?
        </h2>
        
        <form @submit.prevent="submitForm" class="w-full max-w-4xl mx-auto flex flex-col  space-y-6 page-container font-merriweather text-lg">
            <!-- Name Input -->
            <div>
                <input 
                    type="text" 
                    v-model="form.name"
                    required
                    placeholder="Name"
                    class="w-full bg-white/5 text-gray-200 placeholder-neutral-400 border-b border-neutral-500  focus:outline-none focus:bg-white/10 transition-all font-merriweather text-lg "
                    style="padding: 1rem 1rem;"
                >
            </div>

            <!-- Email Input -->
            <div>
                <input 
                    type="email" 
                    v-model="form.email"
                    required
                    placeholder="Email"
                    class="w-full bg-white/5 text-gray-200 placeholder-neutral-400 border-b border-neutral-500  focus:outline-none focus:bg-white/10 transition-all font-merriweather text-lg "
                    style="padding: 1rem 1rem;"
                >
            </div>

            <!-- Message Input -->
            <div>
                <textarea 
                    v-model="form.message"
                    required
                    rows="5"
                    placeholder="Your Message..."
                    class="w-full bg-white/5 text-gray-200 placeholder-neutral-400 border-b border-neutral-500  focus:outline-none focus:bg-white/10 transition-all font-merriweather text-lg "
                    style="padding: 1rem 1rem;"
                ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="pt-6 flex justify-center">
                <button 
                    type="submit"
                    class="px-12 cursor-pointer py-4 bg-linear-to-r from-red-400/90 to-red-400/60 hover:from-red-400 hover:to-red-400 text-white font-magilio text-xl rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(239,68,68,0.2)] hover:shadow-[0_15px_30px_rgba(239,68,68,0.4)] border-none uppercase tracking-wide"
                >
                    Submit
                </button>
            </div>
        </form>
    </section>
</template>
