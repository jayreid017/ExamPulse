import { supabase } from "./supabaseClient";

export const getAllUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
        console.error("Error fetching users:", error);
        return null;
    }

    return data;
};

export async function registerUser(email: string, password: string, name: string) {
  // 1️⃣ Create user in Supabase Auth
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) return { error: authError.message };

  // 2️⃣ Insert profile into users table
  const { data, error } = await supabase
    .from('users')
    .insert([{ id: authUser.user.id, name }]);

  if (error) return { error: error.message };

  return { data };
}
export const loginUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("Error logging in:", error.message);
        return { error: error.message };
    }

    return { data };
};

export const getUserRole = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) return null;
  return data?.role;
};
