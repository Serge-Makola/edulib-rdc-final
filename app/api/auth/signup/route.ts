import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

// Mock database - replace with real Prisma when available
const users: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, university, faculty, role } = await request.json();

    // Validation
    if (!name || !email || !password || !university || !faculty || !role) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password: hashedPassword,
      university,
      faculty,
      role: role || 'student',
      isAdmin: false,
    };

    users.push(newUser);

    return NextResponse.json(
      { 
        message: 'Inscription réussie',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
