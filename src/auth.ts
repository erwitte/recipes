import { signUp } from 'aws-amplify/auth';

export async function handleSignUp(
  email: string,
  password: string
) {
  return await signUp({
    username: email,
    password,
    options: {
      userAttributes: {
        email,
      },
    },
  });
}

import { confirmSignUp } from 'aws-amplify/auth';

export async function handleConfirmSignUp(
  email: string,
  code: string
) {
  return await confirmSignUp({
    username: email,
    confirmationCode: code,
  });
}

import { signIn } from 'aws-amplify/auth';

export async function handleSignIn(
  email: string,
  password: string
) {
  return await signIn({
    username: email,
    password,
  });
}

import { signOut } from 'aws-amplify/auth';

export async function handleSignOut(): Promise<void> {
  await signOut();
}

import { getCurrentUser } from 'aws-amplify/auth';
import type { AuthUser } from 'aws-amplify/auth';

export async function getUser(): Promise<AuthUser | null> {
  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
}
