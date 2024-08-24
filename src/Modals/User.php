<?php
/**
 * User Modal.
 *
 * @package Ankit\TemporaryAccess
 * @since   1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\Modals;

use Exception;
use InvalidArgumentException;

/**
 * Class User.
 *
 * @property int    $id          User ID.
 * @property string $user_email  User email.
 * @property string $first_name  First name.
 * @property string $last_name   Last name.
 * @property string $user_login  User login.
 * @property string $role        User role.
 * @property string $start_date  Start date.
 * @property string $end_date    End date.
 * @property string $redirect    Redirect URL.
 * @property int    $gmt_timestamp_start Start date in GMT.
 * @property int    $local_timestamp_start Start date in local timezone.
 * @property int    $gmt_timestamp_end End date in GMT.
 * @property int    $local_timestamp_end End date in local timezone.
 *
 * @package Ankit\TemporaryAccess\Modal
 */
class User {

	/**
	 * Setter attributes.
	 *
	 * @var string[]
	 */
	public $setters = array(
		'ID',
		'user_email',
		'first_name',
		'last_name',
		'user_login',
		'role',
		'start_date',
		'end_date',
		'redirect',
	);

	/**
	 * Context for user object. This can be either create or update.
	 *
	 * @var string
	 */
	public static $context;

	/**
	 * User constructor.
	 *
	 * @param array  $data    User data.
	 * @param string $context Context in which object is being used. Create/Update.
	 */
	public function __construct( array $data = array(), string $context = 'create' ) {
		self::$context = $context;

		foreach ( $data as $k => $v ) {
			if ( in_array( $k, $this->setters, true ) ) {
				$this->{$k} = $v;
				if ( method_exists( $this, 'validate_' . $k ) ) {
					call_user_func( array( $this, 'validate_' . $k ) );
				}
				continue;
			}

			$this->{$k} = null;
		}
	}

	/**
	 * Validate email address.
	 *
	 * @throws InvalidArgumentException Exception for invalid email address.
	 */
	public function validate_user_email() {
		/**
		 * Email can be skipped during updation.
		 */
		if ( 'update' === self::$context && empty( $this->user_email ) ) {
			return;
		}

		/**
		 * Email is mandatory during registration.
		 */
		if ( 'create' === self::$context && empty( $this->user_email ) ) {
			throw new InvalidArgumentException( esc_html__( 'Please provide email address', 'passwordless-temporary-login' ) );
		}

		/**
		 * Email should not be already in use.
		 */
		if ( 'create' === self::$context && email_exists( $this->user_email ) ) {
			throw new InvalidArgumentException( esc_html__( 'Email is already associated with an account. Please use different email address', 'passwordless-temporary-login' ) );
		}

		/**
		 * Finally, email needs to be a valid one.
		 */
		if ( ! empty( $this->user_email ) && ! filter_var( $this->user_email, FILTER_VALIDATE_EMAIL ) ) {
			throw new InvalidArgumentException( esc_html__( 'Invalid email address', 'passwordless-temporary-login' ) );
		}
	}

	/**
	 * Validate the role of the user.
	 *
	 * @throws InvalidArgumentException Exception for invalid role.
	 */
	public function validate_role() {
		/**
		 * Email can be skipped during updation.
		 */
		if ( 'update' === self::$context && empty( $this->role ) ) {
			return;
		}

		$roles = wp_roles()->roles;
		$roles = array_keys( $roles );

		if ( ! in_array( $this->role, $roles, true ) ) {
			throw new InvalidArgumentException( esc_html__( 'Invalid role selected', 'passwordless-temporary-login' ) );
		}
	}

	/**
	 * Validate the ID.
	 *
	 * @throws Exception Exception for invalid ID.
	 */
	public function validate_id() {
		if ( ! empty( $this->id ) ) {
			$user = get_user_by( 'id', (int) $this->id );
			if ( ! $user ) {
				throw new Exception( esc_html__( 'Invalid ID specified for the user.', 'passwordless-temporary-login' ) );
			}
		}
	}

	/**
	 * Validate the start date.
	 *
	 * @throws InvalidArgumentException Exception for invalid date.
	 */
	public function validate_start_date() {
		if ( empty( $this->start_date ) ) {
			throw new InvalidArgumentException( esc_html__( 'Please provide start date', 'passwordless-temporary-login' ) );
		}

		$dates = $this->validate_date( $this->start_date );

		$this->gmt_timestamp_start   = $dates['gmt_timestamp'];
		$this->local_timestamp_start = $dates['local_timestamp'];
	}

	/**
	 * Validate the end date.
	 *
	 * @throws InvalidArgumentException Exception for invalid date.
	 */
	public function validate_end_date() {
		if ( empty( $this->end_date ) ) {
			throw new InvalidArgumentException( esc_html__( 'Please provide end date', 'passwordless-temporary-login' ) );
		}

		$dates = $this->validate_date( $this->end_date );

		$this->gmt_timestamp_end   = $dates['gmt_timestamp'];
		$this->local_timestamp_end = $dates['local_timestamp'];
	}

	/**
	 * Receives a date string and checks if it can be converted to the timestamp according to site's timezone.
	 *
	 * @param string $date Date string.
	 *
	 * @throws InvalidArgumentException Exception for invalid date.
	 */
	private function validate_date( string $date ) {
		$offset    = floatval( get_option( 'gmt_offset', 0 ) ) * HOUR_IN_SECONDS;
		$timestamp = strtotime( $date );

		if ( false === $timestamp ) {
			throw new InvalidArgumentException( esc_html__( 'Invalid date format', 'passwordless-temporary-login' ) );
		}

		return array(
			'gmt_timestamp'   => $timestamp,
			'local_timestamp' => $timestamp + $offset,
		);
	}
}
