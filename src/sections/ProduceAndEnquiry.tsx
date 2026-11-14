import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useResponsive } from '../hooks/useResponsive';
import { trackEvent } from '../analytics/analytics';
import {
  PRODUCE_CATEGORIES,
  PRODUCE_ITEMS,
  ProduceCategory,
  ProduceItem,
} from '../data';

const COUNTRIES = [
  'Select country',
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Oman',
  'Kuwait',
  'Singapore',
  'Malaysia',
  'United Kingdom',
  'Australia',
  'United States',
  'Germany',
  'Netherlands',
  'Other Country',
];

const CATEGORIES_LIST = [
  'Select category',
  'Vegetables',
  'Fruits',
  'Flowers',
  'Spices & Herbs',
  'Other Produce',
];

const UNITS = ['Select unit', 'Metric Tons (MT)', 'Kilograms (kg)', 'Tons', 'Crates / Boxes'];

const FREQUENCIES = [
  'Select frequency',
  'One-Time Shipment',
  'Weekly Supply',
  'Bi-Weekly Supply',
  'Monthly Contract',
  'Seasonal Contract',
];

const PACKAGING_OPTIONS = [
  'Select packaging',
  'Corrugated Export Cartons',
  'Mesh Bags (Leno)',
  'Plastic / Wooden Crates',
  'Vacuum Sealed Bags',
  'Custom Export Packaging',
];

export function ProduceAndEnquiry() {
  const { isMobile, isTablet } = useResponsive();
  const stack = isMobile || isTablet;

  // Produce filter state
  const [selectedCategory, setSelectedCategory] = useState<ProduceCategory>('All Products');
  const [activeModalProduct, setActiveModalProduct] = useState<ProduceItem | null>(null);

  // Form state
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [phoneCode, setPhoneCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [prodCategory, setProdCategory] = useState(CATEGORIES_LIST[0]);
  const [prodName, setProdName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState(UNITS[0]);
  const [frequency, setFrequency] = useState(FREQUENCIES[0]);
  const [destCountry, setDestCountry] = useState(COUNTRIES[0]);
  const [destPort, setDestPort] = useState('');
  const [packaging, setPackaging] = useState(PACKAGING_OPTIONS[0]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [qualityGrade, setQualityGrade] = useState('');
  const [notes, setNotes] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const filteredItems = PRODUCE_ITEMS.filter((item) => {
    if (selectedCategory === 'All Products') return true;
    if (selectedCategory === 'Vegetables') return item.category === 'Vegetable';
    if (selectedCategory === 'Fruits') return item.category === 'Fruit';
    if (selectedCategory === 'Flowers') return item.category === 'Flower';
    return true;
  });

  const handleEnquireProduct = (product: ProduceItem) => {
    trackEvent('product_enquire_click', { product: product.name });
    setProdName(product.name);
    setProdCategory(product.category === 'Vegetable' ? 'Vegetables' : product.category === 'Fruit' ? 'Fruits' : 'Flowers');
    setActiveModalProduct(null);

    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const el = document.getElementById('rfq-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleSubmit = () => {
    if (!company.trim() || !contactName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please fill in required buyer details (Company, Name, Email, Phone).');
      return;
    }
    if (!prodName.trim() || !quantity.trim()) {
      setErrorMessage('Please specify required Product Name and Quantity.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      trackEvent('rfq_submitted', {
        company,
        product: prodName,
        quantity,
        country: destCountry,
      });
    }, 900);
  };

  const resetForm = () => {
    setCompany('');
    setContactName('');
    setEmail('');
    setPhone('');
    setProdName('');
    setQuantity('');
    setDestPort('');
    setQualityGrade('');
    setNotes('');
    setSubmitted(false);
  };

  return (
    <View style={styles.section} nativeID="products">
      <Container>
        <View style={[styles.splitRow, stack && styles.splitRowStack]}>
          {/* ================= LEFT COLUMN: OUR FRESH PRODUCE ================= */}
          <View style={[styles.produceCol, stack && styles.colFull]}>
            <View style={styles.produceHeader}>
              <Text style={styles.sectionTitle}>
                Our <Text style={styles.titleGreen}>Fresh Produce</Text>
              </Text>
              <Text style={styles.sectionSubtitle}>
                Explore a selection of fresh Indian vegetables and fruits available for international supply.
              </Text>
            </View>

            {/* Filter Pills */}
            <View style={styles.filterRow}>
              {PRODUCE_CATEGORIES.map((cat) => {
                const isActive = cat === selectedCategory;
                const iconName =
                  cat === 'Vegetables'
                    ? 'leaf-outline'
                    : cat === 'Fruits'
                    ? 'nutrition-outline'
                    : cat === 'Flowers'
                    ? 'rose-outline'
                    : 'grid-outline';

                return (
                  <Pressable
                    key={cat}
                    onPress={() => setSelectedCategory(cat)}
                    style={[styles.filterPill, isActive && styles.filterPillActive]}
                  >
                    <Ionicons
                      name={iconName as any}
                      size={14}
                      color={isActive ? colors.white : colors.body}
                      style={{ marginRight: 5 }}
                    />
                    <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{cat}</Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Product Grid: 5 columns on desktop, wrap on smaller */}
            <View style={styles.productGrid}>
              {filteredItems.map((prod) => (
                <View key={prod.id} style={styles.productCardWrap}>
                  <View style={styles.productCard}>
                    <View style={styles.cardThumbWrap}>
                      <Image
                        source={prod.image}
                        style={styles.cardThumb}
                        resizeMode="cover"
                        accessibilityLabel={prod.name}
                      />
                    </View>

                    {/* Badge */}
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{prod.category}</Text>
                    </View>

                    <Text style={styles.prodName} numberOfLines={1}>
                      {prod.name}
                    </Text>

                    <View style={styles.metaRow}>
                      <Ionicons name="location-outline" size={11} color={colors.green} style={{ marginRight: 3 }} />
                      <Text style={styles.metaText}>Origin: {prod.origin}</Text>
                    </View>

                    <View style={styles.metaRow}>
                      <Ionicons name="calendar-outline" size={11} color={colors.green} style={{ marginRight: 3 }} />
                      <Text style={styles.metaText}>Available: {prod.available}</Text>
                    </View>

                    <Text style={styles.priceTag}>{prod.price}</Text>
                    <Text style={styles.moqText}>{prod.moq}</Text>

                    {/* Card Actions */}
                    <View style={styles.cardActions}>
                      <Pressable
                        style={styles.btnDetails}
                        onPress={() => setActiveModalProduct(prod)}
                      >
                        <Text style={styles.btnDetailsText}>View Details</Text>
                      </Pressable>

                      <Pressable
                        style={styles.btnEnquire}
                        onPress={() => handleEnquireProduct(prod)}
                      >
                        <Text style={styles.btnEnquireText}>Enquire Now</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Bottom button */}
            <View style={styles.viewAllWrap}>
              <Button
                label="View All Products"
                variant="green-outline"
                size="sm"
                icon="arrow-forward"
                iconPosition="right"
                onPress={() => setSelectedCategory('All Products')}
              />
            </View>
          </View>

          {/* ================= RIGHT COLUMN: RFQ ENQUIRY FORM ================= */}
          <View style={[styles.formCol, stack && styles.colFull]} nativeID="rfq-form">
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>
                Looking for <Text style={styles.titleGreen}>Fresh Indian Produce?</Text>
              </Text>
              <Text style={styles.formSubtitle}>
                Share your product requirements with us. Our export team will connect with you and provide a suitable quotation.
              </Text>

              {submitted ? (
                <View style={styles.successBox}>
                  <View style={styles.successIconWrap}>
                    <Ionicons name="checkmark-circle" size={48} color={colors.greenDeep} />
                  </View>
                  <Text style={styles.successTitle}>Enquiry Received!</Text>
                  <Text style={styles.successDesc}>
                    Thank you, <Text style={{ fontWeight: '700' }}>{contactName}</Text>. Our export specialist will review your requirement for <Text style={{ fontWeight: '700' }}>{prodName || 'fresh produce'}</Text> and send a formal quotation to <Text style={{ fontWeight: '700' }}>{email}</Text> within 24 hours.
                  </Text>
                  <Button
                    label="Submit Another Enquiry"
                    variant="orange"
                    size="sm"
                    onPress={resetForm}
                    style={{ marginTop: 18 }}
                  />
                </View>
              ) : (
                <View style={styles.formFields}>
                  {errorMessage ? (
                    <View style={styles.errorBanner}>
                      <Ionicons name="alert-circle" size={16} color="#DC2626" style={{ marginRight: 6 }} />
                      <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                  ) : null}

                  {/* 1. Buyer Information */}
                  <View style={styles.sectionHeaderWrap}>
                    <Ionicons name="person-circle-outline" size={16} color={colors.greenDeep} style={{ marginRight: 6 }} />
                    <Text style={styles.formSectionHeader}>Buyer Information</Text>
                  </View>

                  <View style={styles.formGrid2}>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Company / Business Name *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter company name"
                        placeholderTextColor={colors.muted}
                        value={company}
                        onChangeText={setCompany}
                      />
                    </View>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Contact Person *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter contact person name"
                        placeholderTextColor={colors.muted}
                        value={contactName}
                        onChangeText={setContactName}
                      />
                    </View>
                  </View>

                  <View style={styles.formGrid2}>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Business Email *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter business email"
                        placeholderTextColor={colors.muted}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                      />
                    </View>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Country *</Text>
                      {Platform.OS === 'web' ? (
                        <select
                          value={country}
                          onChange={(e: any) => setCountry(e.target.value)}
                          style={webSelectStyle}
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      ) : (
                        <TextInput
                          style={styles.input}
                          placeholder="Select country"
                          placeholderTextColor={colors.muted}
                          value={country}
                          onChangeText={setCountry}
                        />
                      )}
                    </View>
                  </View>

                  <View style={styles.fieldWrap}>
                    <Text style={styles.label}>Mobile / WhatsApp Number *</Text>
                    <View style={styles.phoneRow}>
                      <View style={styles.phoneCodeWrap}>
                        <Text style={styles.phoneCodeText}>🇮🇳 +91</Text>
                      </View>
                      <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Enter mobile number"
                        placeholderTextColor={colors.muted}
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                      />
                    </View>
                  </View>

                  {/* 2. Product Requirements */}
                  <View style={[styles.sectionHeaderWrap, { marginTop: 14 }]}>
                    <Ionicons name="cube-outline" size={16} color={colors.greenDeep} style={{ marginRight: 6 }} />
                    <Text style={styles.formSectionHeader}>Product Requirements</Text>
                  </View>

                  <View style={styles.formGrid3}>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Product Category *</Text>
                      {Platform.OS === 'web' ? (
                        <select
                          value={prodCategory}
                          onChange={(e: any) => setProdCategory(e.target.value)}
                          style={webSelectStyle}
                        >
                          {CATEGORIES_LIST.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      ) : (
                        <TextInput
                          style={styles.input}
                          placeholder="Category"
                          placeholderTextColor={colors.muted}
                          value={prodCategory}
                          onChangeText={setProdCategory}
                        />
                      )}
                    </View>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Product Name *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter product name"
                        placeholderTextColor={colors.muted}
                        value={prodName}
                        onChangeText={setProdName}
                      />
                    </View>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Required Quantity *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter quantity"
                        placeholderTextColor={colors.muted}
                        value={quantity}
                        onChangeText={setQuantity}
                      />
                    </View>
                  </View>

                  <View style={styles.formGrid2}>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Unit *</Text>
                      {Platform.OS === 'web' ? (
                        <select
                          value={unit}
                          onChange={(e: any) => setUnit(e.target.value)}
                          style={webSelectStyle}
                        >
                          {UNITS.map((u) => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                        </select>
                      ) : (
                        <TextInput
                          style={styles.input}
                          placeholder="Select unit"
                          placeholderTextColor={colors.muted}
                          value={unit}
                          onChangeText={setUnit}
                        />
                      )}
                    </View>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Order Frequency *</Text>
                      {Platform.OS === 'web' ? (
                        <select
                          value={frequency}
                          onChange={(e: any) => setFrequency(e.target.value)}
                          style={webSelectStyle}
                        >
                          {FREQUENCIES.map((f) => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                      ) : (
                        <TextInput
                          style={styles.input}
                          placeholder="Select frequency"
                          placeholderTextColor={colors.muted}
                          value={frequency}
                          onChangeText={setFrequency}
                        />
                      )}
                    </View>
                  </View>

                  {/* 3. Shipping Requirements */}
                  <View style={[styles.sectionHeaderWrap, { marginTop: 14 }]}>
                    <Ionicons name="boat-outline" size={16} color={colors.greenDeep} style={{ marginRight: 6 }} />
                    <Text style={styles.formSectionHeader}>Shipping Requirements</Text>
                  </View>

                  <View style={styles.formGrid2}>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Destination Country *</Text>
                      {Platform.OS === 'web' ? (
                        <select
                          value={destCountry}
                          onChange={(e: any) => setDestCountry(e.target.value)}
                          style={webSelectStyle}
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      ) : (
                        <TextInput
                          style={styles.input}
                          placeholder="Select country"
                          placeholderTextColor={colors.muted}
                          value={destCountry}
                          onChangeText={setDestCountry}
                        />
                      )}
                    </View>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Destination Port / City *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter port or city"
                        placeholderTextColor={colors.muted}
                        value={destPort}
                        onChangeText={setDestPort}
                      />
                    </View>
                  </View>

                  <View style={styles.formGrid2}>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Preferred Packaging</Text>
                      {Platform.OS === 'web' ? (
                        <select
                          value={packaging}
                          onChange={(e: any) => setPackaging(e.target.value)}
                          style={webSelectStyle}
                        >
                          {PACKAGING_OPTIONS.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      ) : (
                        <TextInput
                          style={styles.input}
                          placeholder="Select packaging"
                          placeholderTextColor={colors.muted}
                          value={packaging}
                          onChangeText={setPackaging}
                        />
                      )}
                    </View>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Expected Delivery Date</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Select date (DD/MM/YYYY)"
                        placeholderTextColor={colors.muted}
                        value={deliveryDate}
                        onChangeText={setDeliveryDate}
                      />
                    </View>
                  </View>

                  {/* 4. Additional Details */}
                  <View style={[styles.sectionHeaderWrap, { marginTop: 14 }]}>
                    <Ionicons name="document-text-outline" size={16} color={colors.greenDeep} style={{ marginRight: 6 }} />
                    <Text style={styles.formSectionHeader}>Additional Details</Text>
                  </View>

                  <View style={styles.formGrid2}>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Quality / Grade Requirements</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., Grade A, export quality, size, etc."
                        placeholderTextColor={colors.muted}
                        value={qualityGrade}
                        onChangeText={setQualityGrade}
                      />
                    </View>
                    <View style={styles.fieldWrap}>
                      <Text style={styles.label}>Additional Notes</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Any other specific requirements?"
                        placeholderTextColor={colors.muted}
                        value={notes}
                        onChangeText={setNotes}
                      />
                    </View>
                  </View>

                  {/* Submit Button */}
                  <Pressable
                    style={styles.submitBtn}
                    onPress={handleSubmit}
                    accessibilityRole="button"
                  >
                    <Text style={styles.submitBtnText}>
                      {submitting ? 'Submitting Enquiry...' : 'Submit Your Enquiry ->'}
                    </Text>
                  </Pressable>

                  {/* Privacy reassurance */}
                  <View style={styles.privacyNoteRow}>
                    <Ionicons name="lock-closed-outline" size={13} color={colors.greenDeep} style={{ marginRight: 5 }} />
                    <Text style={styles.privacyNoteText}>
                      Your business information will only be used to respond to your enquiry.
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </Container>

      {/* Product Details Modal */}
      {activeModalProduct && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setActiveModalProduct(null)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{activeModalProduct.name}</Text>
                <Pressable onPress={() => setActiveModalProduct(null)} style={styles.modalClose}>
                  <Ionicons name="close" size={22} color={colors.ink} />
                </Pressable>
              </View>

              <View style={styles.modalBody}>
                <Image
                  source={activeModalProduct.image}
                  style={styles.modalThumb}
                  resizeMode="contain"
                />

                <View style={styles.modalInfo}>
                  <View style={styles.modalBadge}>
                    <Text style={styles.modalBadgeText}>{activeModalProduct.category}</Text>
                  </View>
                  <Text style={styles.modalMeta}>Origin: {activeModalProduct.origin}</Text>
                  <Text style={styles.modalMeta}>Availability: {activeModalProduct.available}</Text>
                  <Text style={styles.modalPrice}>{activeModalProduct.price}</Text>
                  <Text style={styles.modalMoq}>{activeModalProduct.moq}</Text>
                  <Text style={styles.modalDesc}>
                    Premium export grade {activeModalProduct.name.toLowerCase()} sourced directly from verified Indian growers, inspected, graded, and packed to global export standards.
                  </Text>
                </View>
              </View>

              <View style={styles.modalFooter}>
                <Button
                  label="Close"
                  variant="outline"
                  size="sm"
                  onPress={() => setActiveModalProduct(null)}
                />
                <Button
                  label="Enquire Now"
                  variant="orange"
                  size="sm"
                  icon="paper-plane-outline"
                  iconPosition="left"
                  onPress={() => handleEnquireProduct(activeModalProduct)}
                  style={{ marginLeft: 10 }}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const webSelectStyle = {
  width: '100%',
  padding: '7px 10px',
  borderRadius: '6px',
  border: '1px solid #D5E4D8',
  backgroundColor: '#FFFFFF',
  color: colors.ink,
  fontSize: '12px',
  outline: 'none',
  fontFamily: 'inherit',
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 56,
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 28 as unknown as number,
  },
  splitRowStack: {
    flexDirection: 'column',
    gap: 36 as unknown as number,
  },
  produceCol: {
    flex: 1.45,
  },
  formCol: {
    flex: 1.15,
  },
  colFull: {
    width: '100%',
  },
  produceHeader: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  titleGreen: {
    color: colors.greenDeep,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.body,
    lineHeight: 19,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8 as unknown as number,
    marginBottom: 20,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    backgroundColor: '#F3F6F4',
    borderWidth: 1,
    borderColor: '#E2EDE5',
  },
  filterPillActive: {
    backgroundColor: colors.greenDeep,
    borderColor: colors.greenDeep,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.body,
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  productCardWrap: {
    width: '20%', // 5 columns on desktop
    minWidth: 105,
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: '#E8EFEA',
    padding: 7,
    ...shadow.soft,
  },
  cardThumbWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#F4F7F4',
    marginBottom: 6,
  },
  cardThumb: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F3F1',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    marginBottom: 4,
  },
  categoryBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.muted,
  },
  prodName: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  metaText: {
    fontSize: 9.5,
    color: colors.body,
  },
  priceTag: {
    fontSize: 11.5,
    fontWeight: '800',
    color: colors.greenDeep,
    marginTop: 4,
  },
  moqText: {
    fontSize: 9,
    color: colors.muted,
    marginBottom: 6,
  },
  cardActions: {
    gap: 4 as unknown as number,
  },
  btnDetails: {
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D4E2D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDetailsText: {
    fontSize: 9.5,
    fontWeight: '600',
    color: colors.ink,
  },
  btnEnquire: {
    paddingVertical: 4.5,
    borderRadius: 4,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEnquireText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.white,
  },
  viewAllWrap: {
    alignItems: 'center',
    marginTop: 14,
  },

  /* RFQ Form Styles */
  formCard: {
    backgroundColor: '#F4FAF5',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#D2E6D7',
    padding: 22,
    ...shadow.soft,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.ink,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  formSubtitle: {
    fontSize: 12,
    color: colors.body,
    lineHeight: 17,
    marginBottom: 16,
  },
  formFields: {},
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 11.5,
    fontWeight: '600',
  },
  sectionHeaderWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  formSectionHeader: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.ink,
  },
  formGrid2: {
    flexDirection: 'row',
    gap: 10 as unknown as number,
    marginBottom: 8,
  },
  formGrid3: {
    flexDirection: 'row',
    gap: 8 as unknown as number,
    marginBottom: 8,
  },
  fieldWrap: {
    flex: 1,
  },
  label: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 3,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5E4D8',
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 6,
    fontSize: 11.5,
    color: colors.ink,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6 as unknown as number,
  },
  phoneCodeWrap: {
    backgroundColor: '#EAF4EC',
    borderWidth: 1,
    borderColor: '#D5E4D8',
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneCodeText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.ink,
  },
  submitBtn: {
    backgroundColor: colors.orange,
    borderRadius: radius.pill,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    marginBottom: 10,
    ...shadow.soft,
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  privacyNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyNoteText: {
    fontSize: 10.5,
    color: colors.muted,
  },
  successBox: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 12,
  },
  successIconWrap: {
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.ink,
    marginBottom: 8,
  },
  successDesc: {
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.body,
    textAlign: 'center',
    maxWidth: 380,
  },

  /* Modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    width: '100%',
    maxWidth: 420,
    padding: 20,
    ...shadow.card,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.ink,
  },
  modalClose: {
    padding: 4,
  },
  modalBody: {
    flexDirection: 'row',
    gap: 16 as unknown as number,
    marginBottom: 20,
  },
  modalThumb: {
    width: 100,
    height: 100,
    borderRadius: radius.sm,
    backgroundColor: '#F3F6F4',
  },
  modalInfo: {
    flex: 1,
  },
  modalBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.greenSoft,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  modalBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.greenDeep,
  },
  modalMeta: {
    fontSize: 11.5,
    color: colors.body,
    marginBottom: 2,
  },
  modalPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.greenDeep,
    marginTop: 4,
  },
  modalMoq: {
    fontSize: 11,
    color: colors.muted,
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.body,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
