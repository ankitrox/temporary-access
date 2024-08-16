<?php
/**
 * Users list table in admin.
 * 
 * @package Ankit\TemporaryAccess\UI
 * @since   1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\UI;

use Ankit\TemporaryAccess\UserManager;

/**
 * Class UsersTable
 *
 * @package Ankit\TemporaryAccess\UI
 */
class UsersTable {

    /**
     * Initialization setup.
     */
    public function init() {
        add_action( 'users_list_table_query_args', array( $this, 'filter_users' ) );
    }

    /**
     * Filter temporary users in the users list table.
     * 
     * @param array $args Query arguments.
     * @return array Query arguments.
     */
    public function filter_users( $args ) {
        if ( 'users' === get_current_screen()->id ) {
            $args['meta_query'] = array(
                array(
                    'key'     => UserManager::START_DATE_KEY,
                    'compare' => 'NOT EXISTS',
                ),
            );
        }

        return $args;
    }
}
