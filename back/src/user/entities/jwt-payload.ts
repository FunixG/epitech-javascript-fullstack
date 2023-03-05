export default interface JwtPayload {
  /**
   * A string representing the subject of the JWT,
   * typically the user ID or some other unique identifier.
   */
  sub: string;

  /**
   * A string representing the username or email address of the user.
   */
  username: string;

  /**
   * An array of strings representing the roles assigned to the user, such as "admin" or "user".
   */
  roles: string[];

  /**
   * An optional number representing the time at which
   * the JWT was issued,in seconds since the Unix epoch.
   */
  iat?: number;

  /**
   * An optional number representing the expiration time
   * of the JWT, in seconds since the Unix epoch.
   */
  exp?: number;
}
