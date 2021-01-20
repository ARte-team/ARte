/*
 * Copyright (C) 2019 ML!PA Consulting GmbH
 *
 * This file is subject to the terms and conditions of the GNU Lesser
 * General Public License v2.1. See the file LICENSE in the top level
 * directory for more details.
 */

/**
 * @ingroup     drivers_at86rf215
 * @{
 *
 * @file
 * @brief       Low-Level functions for the AT86RF215 driver
 *
 * @author      Benjamin Valentin <benjamin.valentin@ml-pa.com>
 * @}
 */

#ifndef AT86RF215_INTERNAL_H
#define AT86RF215_INTERNAL_H

#include <stdint.h>
#include "at86rf215.h"
#include "at86rf215_registers.h"

#ifdef __cplusplus
extern "C" {
#endif

/**
 * @brief Minimum reset pulse width (tRST) in µs
 */
#define AT86RF215_RESET_PULSE_WIDTH_US  (16U)

/**
 * @brief The typical transition time to TRX_OFF after reset (tPOWERON) in µs
 */
#define AT86RF215_RESET_DELAY_US        (16U)

/** Default energy detect threshold for CSMA (reset value) */
#define AT86RF215_EDT_DEFAULT           (-84) /* dBm */

/**
 * This is used to calculate the csma backoff based on the bitrate.
 */
/** 20 symbols is the std period length */
#define AT86RF215_BACKOFF_PERIOD_IN_SYMBOLS (20U)
/** in 802.15.4 oqpsk each symble is 4 bits, not about the others */
#define AT86RF215_BACKOFF_PERIOD_IN_BITS    (AT86RF215_BACKOFF_PERIOD_IN_SYMBOLS * 4)

/**
 * Default Parameters for 802.15.4 retransmissions & CSMA
 * @{
 */
#define AT86RF215_RETRIES_MAX_DEFAULT       (3)
#define AT86RF215_CSMA_RETRIES_MAX_DEFAULT  (4)
#define AT86RF215_CSMA_MIN_BE_DEFAULT       (3)
#define AT86RF215_CSMA_MAX_BE_DEFAULT       (5)
/** @} */

/** For the SUN PHYs, the value is 1 ms expressed in symbol periods, rounded up to the next
    integer number of symbol periods using the ceiling() function */
#define AT86RF215_TURNAROUND_TIME_US        (1 * US_PER_MS)

/** An ACK consists of 5 payload bytes */
#define AT86RF215_ACK_PSDU_BYTES            (5)

/**
 * This is used to calculate the ACK timeout based on the bitrate.
 * AT86RF233 uses an ACK timeout of 54 symbol periods, or 864 µs @ 250 kbit/s
 * -> 864µs * 250kbit/s = 216 bit */
#define AT86RF215_ACK_PERIOD_IN_SYMBOLS (54U)
/** in 802.15.4 oqpsk each symble is 4 bits, not about the others */
#define AT86RF215_ACK_PERIOD_IN_BITS    (AT86RF215_ACK_PERIOD_IN_SYMBOLS * 4)

#define AT86RF215_OQPSK_MODE_LEGACY           (0x1)                             /**< legacy mode, 250 kbit/s */
#define AT86RF215_OQPSK_MODE_LEGACY_HDR       (0x3)                             /**< legacy mode, high data rate */
#define AT86RF215_MR_OQPSK_MODE(n)            ((n) << OQPSKPHRTX_MOD_SHIFT)     /**< MR-QPSK */

/**
 * @brief   Perform a reset of the entire chip.
 *
 * @param   dev     device to reset, will also reset sibling device
 * @return           0 on success, error if device is not available
 */
int at86rf215_hardware_reset(at86rf215_t *dev);

/**
 * @brief Write to a register at address `addr` from device `dev`.
 *
 * @param[in] dev   device to write to
 * @param[in] reg   address of the register to write
 * @param[in] val   value to write to the given register
 */
void at86rf215_reg_write(const at86rf215_t *dev, uint16_t reg, uint8_t val);

/**
 * @brief   Write a chunk of data into the memory of the given device
 *
 * @param[in] dev       device to write to
 * @param[in] reg       address in the device to write to
 * @param[in] data      data to copy into the device
 * @param[in] len       number of bytes to write into the device
 */
void at86rf215_reg_write_bytes(const at86rf215_t *dev, uint16_t reg, const void *data, size_t len);

/**
 * @brief Read from a register at address `addr` from device `dev`.
 *
 * @param[in] dev   device to read from
 * @param[in] reg   address of the register to read
 *
 * @return          the value of the specified register
 */
uint8_t at86rf215_reg_read(const at86rf215_t *dev, uint16_t reg);

/**
 * @brief   Read a chunk of data from the memory of the given device
 *
 * @param[in]  dev      device to read from
 * @param[in]  reg      starting address to read from
 * @param[out] data     buffer to read data into
 * @param[in]  len      number of bytes to read
 */
void at86rf215_reg_read_bytes(const at86rf215_t *dev, uint16_t reg, void *data, size_t len);

/**
 * @brief Enable / Disable the ACK filter
 *
 * @param[in] dev   device to configure
 * @param[in] on    if true, only ACK frames are received
 *                  if false, only non-ACK frames are received
 */
void at86rf215_filter_ack(at86rf215_t *dev, bool on);

/**
 * @brief   Read random data from the RNG
 *
 * @pre     The device has to be in state RX with PLL locked.
 *
 * @param[in]  dev      device to configure
 * @param[out] data     buffer to copy the random data to
 * @param[in]  len      number of random bytes to store in data
 */
void at86rf215_get_random(at86rf215_t *dev, void *data, size_t len);

/**
 * @brief   Configure the radio to make use of O-QPSK modulation.
 *          The rate mode may be
 *              - 0 for compatibility with first-gen 802.15.4 devices (250 kbit/s)
 *              - 1 for compatibility with the proprietary high-data rate modes of at86rf2xx
 *
 * @param[in] dev       device to configure
 * @param[in] high_rate use proprietary high data rate compatible with at86rf2xx
 *
 * @return              0 on success, error otherwise
 */
int at86rf215_configure_legacy_OQPSK(at86rf215_t *dev, bool high_rate);

/**
 * @brief   Check if a channel number is valid.
 *          The function takes the current frequency band and modulation into
 *          account to determine if `chan` would be a legal channel number.
 *          If so, it is returned unmodified. Otherwise the next closest legal
 *          channel number is returned.
 *
 * @note    This function does not change the configuration.
 *
 * @param[in] dev       device to check against
 * @param[in] chan      the channel number to check
 *
 * @return              If the channel number is legal, `chan` is returned.
 *                      Otherwise the next closest legal channel number is
 *                      returned.
 */
uint16_t at86rf215_chan_valid(at86rf215_t *dev, uint16_t chan);

/**
 * @brief   Converts radio state into human readable string.
 *
 * @param[in] state     radio state
 *
 * @return              fixed string representation of the radio state
 */
const char* at86rf215_hw_state2a(uint8_t state);

/**
 * @brief   Converts state machine state into human readable string.
 *
 * @param[in] state     state of the driver's state machine
 *
 * @return              fixed string representation of the state machine state
 */
const char* at86rf215_sw_state2a(at86rf215_state_t state);

/**
 * @brief   Reads the contents of `reg`, apply `val` with a bitwise AND
 *          and then writes the result back to `reg`.
 *
 * @param[in] dev       device to write to
 * @param[in] reg       register to write to
 * @param[in] val       value to bitwise AND with the register content
 */
static inline void at86rf215_reg_and(const at86rf215_t *dev, uint16_t reg, uint8_t val)
{
    val &= at86rf215_reg_read(dev, reg);
    at86rf215_reg_write(dev, reg, val);
}

/**
 * @brief   Reads the contents of `reg`, apply `val` with a bitwise OR
 *          and then writes the result back to `reg`.
 *
 * @param[in] dev       device to write to
 * @param[in] reg       register to write to
 * @param[in] val       value to bitwise OR with the register content
 */
static inline void at86rf215_reg_or(const at86rf215_t *dev, uint16_t reg, uint8_t val)
{
    val |= at86rf215_reg_read(dev, reg);
    at86rf215_reg_write(dev, reg, val);
}

/**
 * @brief Write a 16-bit word to a register at address `addr` from device `dev`.
 *
 * @param[in] dev   device to write to
 * @param[in] reg   address of the register to write
 * @param[in] val   value to write to the given register
 */
static inline void at86rf215_reg_write16(const at86rf215_t *dev, uint16_t reg, uint16_t val)
{
    at86rf215_reg_write_bytes(dev, reg, &val, sizeof(val));
}

/**
 * @brief Read a 16-bit word from a register at address `addr` from device `dev`.
 *
 * @param[in] dev   device to read from
 * @param[in] reg   address of the register to read
 *
 * @return          the value of the specified register
 */
static inline uint16_t at86rf215_reg_read16(const at86rf215_t *dev, uint16_t reg)
{
    uint16_t value;
    at86rf215_reg_read_bytes(dev, reg, &value, sizeof(value));
    return value;
}

/**
 * @brief Issue a radio command to the device
 *
 * @param[in] dev    device to configure
 * @param[in] rf_cmd command to send
 */
static inline void at86rf215_rf_cmd(const at86rf215_t *dev, uint8_t rf_cmd)
{
    at86rf215_reg_write(dev, dev->RF->RG_CMD, rf_cmd);
}

/**
 * @brief Get the radio state of the device
 *
 * @param[in] dev   device to read from
 *
 * @return          the current radio state
 */
static inline uint8_t at86rf215_get_rf_state(const at86rf215_t *dev)
{
    return at86rf215_reg_read(dev, dev->RF->RG_STATE) & STATE_STATE_MASK;
}

/**
 * @brief Blocks until the device has reached the given state
 *
 * @param[in] dev    device to poll
 * @param[in] state  the expected state
 */
static inline void at86rf215_await_state(const at86rf215_t *dev, uint8_t state)
{
    while (at86rf215_get_rf_state(dev) != state) {}
}

/**
 * @brief Blocks until the device has reached the given state
 *
 * @param[in] dev    device to poll
 * @param[in] state  the expected state
 */
static inline void at86rf215_await_state_end(const at86rf215_t *dev, uint8_t state)
{
    while (at86rf215_get_rf_state(dev) == state) {}
}

/**
 * @brief Switch device back to IDLE-RX from non-RX idle
 *
 * @param[in] dev         device to update
 * @param[out] old_state  pointer to store the previous state, may be NULL
 *
 * @return  true if the operation was possible
 */
bool at86rf215_set_rx_from_idle(at86rf215_t *dev, uint8_t *old_state);

/**
 * @brief Switch device to non-RX idle state from RX
 *
 * @param[in] dev         device to update
 * @param[out] state      the new state (may be CMD_RF_TRXOFF or CMD_RF_SLEEP)
 *
 * @return  true if the operation was possible
 */
bool at86rf215_set_idle_from_rx(at86rf215_t *dev, uint8_t state);

/**
 * @brief Enable the baseband processor of the device
 *
 * @param[in] dev   device to enable the baseband on
 */
static inline void at86rf215_enable_baseband(const at86rf215_t *dev)
{
    at86rf215_reg_or(dev, dev->BBC->RG_PC, PC_BBEN_MASK);
}

/**
 * @brief Disable the baseband processor of the device
 *
 * @param[in] dev   device to disable the baseband on
 */
static inline void at86rf215_disable_baseband(const at86rf215_t *dev) {
    at86rf215_reg_and(dev, dev->BBC->RG_PC, ~PC_BBEN_MASK);
}

/**
 * @brief Enable the radio hardware with a given modulation.
 *
 * @param[in] dev           device to enable
 * @param[in] modulation    modulation to configure on the radio
 */
static inline void at86rf215_enable_radio(at86rf215_t *dev, uint8_t modulation)
{
    /* 16 bit frame-checksum, baseband enabled, checksum calculated by chip,
       frames with invalid cs are dropped */
    at86rf215_reg_write(dev, dev->BBC->RG_PC, modulation   | PC_BBEN_MASK
                                            | PC_FCST_MASK | PC_TXAFCS_MASK
                                            | PC_FCSFE_MASK);
}

/**
 * @brief Internal convenience function to disable reduced power
 *        consumption (RPC) for energy detection.
 *
 * @param[in] dev           device to configure
 */
void at86rf215_disable_rpc(at86rf215_t *dev);

/**
 * @brief Internal convenience function to re-enable reduced power
 *        consumption (RPC) after energy detection.
 *
 * @param[in] dev           device to configure
 */
void at86rf215_enable_rpc(at86rf215_t *dev);

/**
 * @brief Notify the driver and stack about a change in transmission mode
 *        which may result in a change of PDU.
 *
 * @param[in] dev           device that changed it's mode
 * @param[in] new_mode      the new transmission mode
 */
bool at86rf215_switch_mode(at86rf215_t *dev, uint8_t new_mode);

/**
 * @brief Checks whether the device operates in the sub-GHz band.
 *
 * @param[in] dev   device to read from
 *
 * @return          true if the device operates in the sub-GHz band
 *                  false if the device operates in the 2.4-GHz band
 */
static inline bool is_subGHz(const at86rf215_t *dev)
{
    return dev->RF->RG_IRQS == RG_RF09_IRQS;
}

#ifdef __cplusplus
}
#endif

#endif /* AT86RF215_INTERNAL_H */
/** @} */
